/**
 * Bootstrap script to set up plans and migrate existing data
 * Run this after updating the schema and before starting the application
 */

const { seed } = require('./seeders/plan-seeder');
const { migrate } = require('./migrations/001-migrate-to-plan-model');

async function bootstrap() {
  try {
    console.log('Starting plan setup and migration...');
    
    // First seed the plans
    await seed(strapi);
    
    // Then migrate existing users
    await migrate(strapi);
    
    console.log('Bootstrap completed successfully!');
  } catch (error) {
    console.error('Bootstrap failed:', error);
    process.exit(1);
  }
}

module.exports = { bootstrap };