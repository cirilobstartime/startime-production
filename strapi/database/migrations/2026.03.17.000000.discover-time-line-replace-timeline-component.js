'use strict';

/**
 * Migration: discover_time_line — replace 'timeline' component field
 *
 * REMOVES:
 *   - field: timeline
 *   - component: shared.shared-title-description
 *   - data table: components_shared_shared_title_descriptions
 *
 * ADDS (handled automatically by Strapi on startup):
 *   - field: timeline_element
 *   - component: shared.timeline
 *   - data table: components_shared_timelines
 */

async function up(knex) {
  // Guard: if the junction table doesn't exist yet (e.g. fresh DB),
  // there is no old data to clean up — skip safely.
  const junctionExists = await knex.schema.hasTable('discover_time_lines_components');
  if (!junctionExists) {
    console.log('[migration] discover_time_lines_components does not exist — nothing to clean up.');
    return;
  }

  // 1. Collect IDs of old 'timeline' component rows linked to discover_time_lines
  const linked = await knex('discover_time_lines_components')
    .where({
      field: 'timeline',
      component_type: 'shared.shared-title-description',
    })
    .select('component_id');

  const componentIds = linked.map((row) => row.component_id);

  // 2. Remove the junction-table rows for the old field
  await knex('discover_time_lines_components')
    .where({
      field: 'timeline',
      component_type: 'shared.shared-title-description',
    })
    .delete();

  // 3. Remove the actual component data rows (only if the table exists)
  const dataTableExists = await knex.schema.hasTable('components_shared_shared_title_descriptions');
  if (dataTableExists && componentIds.length > 0) {
    await knex('components_shared_shared_title_descriptions')
      .whereIn('id', componentIds)
      .delete();
  }

  console.log(
    `[migration] Removed ${componentIds.length} old 'timeline' (Shared_Title_Description) rows from discover_time_lines.`
  );
}

async function down(knex) {
  console.warn('[migration] down() is a no-op: deleted component data cannot be restored.');
}

module.exports = { up, down };
