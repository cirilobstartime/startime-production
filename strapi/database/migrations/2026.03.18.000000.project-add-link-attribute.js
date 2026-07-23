'use strict';

/**
 * Migration: project — add 'link' attribute
 *
 * ADDS:
 *   - field: link (text) to the projects table
 */

async function up(knex) {
  const tableExists = await knex.schema.hasTable('projects');
  if (!tableExists) {
    console.log('[migration] projects table does not exist — skipping.');
    return;
  }

  const columnExists = await knex.schema.hasColumn('projects', 'link');
  if (columnExists) {
    console.log('[migration] projects.link column already exists — skipping.');
    return;
  }

  await knex.schema.table('projects', (table) => {
    table.text('link').nullable();
  });

  console.log('[migration] Added link column to projects table.');
}

async function down(knex) {
  const columnExists = await knex.schema.hasColumn('projects', 'link');
  if (!columnExists) return;

  await knex.schema.table('projects', (table) => {
    table.dropColumn('link');
  });

  console.log('[migration] Dropped link column from projects table.');
}

module.exports = { up, down };
