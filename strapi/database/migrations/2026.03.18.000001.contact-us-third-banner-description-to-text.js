'use strict';

/**
 * Migration: contact_us_third_banner — change 'description' from string to text
 *
 * CHANGES:
 *   - field: description (VARCHAR → TEXT) in contact_us_third_banners table
 */

async function up(knex) {
  const tableExists = await knex.schema.hasTable('contact_us_third_banners');
  if (!tableExists) {
    console.log('[migration] contact_us_third_banners table does not exist — skipping.');
    return;
  }

  const columnExists = await knex.schema.hasColumn('contact_us_third_banners', 'description');
  if (!columnExists) {
    console.log('[migration] contact_us_third_banners.description column does not exist — skipping.');
    return;
  }

  await knex.schema.alterTable('contact_us_third_banners', (table) => {
    table.text('description').alter();
  });

  console.log('[migration] Changed contact_us_third_banners.description from VARCHAR to TEXT.');
}

async function down(knex) {
  const columnExists = await knex.schema.hasColumn('contact_us_third_banners', 'description');
  if (!columnExists) return;

  await knex.schema.alterTable('contact_us_third_banners', (table) => {
    table.string('description').alter();
  });

  console.log('[migration] Reverted contact_us_third_banners.description from TEXT to VARCHAR.');
}

module.exports = { up, down };
