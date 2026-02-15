/**
 * Migration to transition from subscriptionStatus to Plan model
 * This migration should be run after the plans are seeded
 */

async function migrate(strapi) {
  console.log('Starting migration from subscriptionStatus to Plan model...');

  try {
    // First ensure plans exist
    const freePlan = await strapi.query('api::plan.plan').findOne({
      where: { name: 'free', isActive: true }
    });
    const paidPlan = await strapi.query('api::plan.plan').findOne({
      where: { name: 'paid', isActive: true }
    });

    if (!freePlan || !paidPlan) {
      console.error('Plans not found! Please run plan seeder first.');
      return;
    }

    // Get all users that need migration
    const users = await strapi.query('plugin::users-permissions.user').findMany({
      where: {},
      select: ['id'],
      // Note: subscriptionStatus field might not exist anymore if schema was already updated
    });

    let migratedCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Check if user already has a plan assigned
        const userWithPlan = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: user.id },
          populate: ['plan']
        });

        if (!userWithPlan.plan) {
          // Assign free plan as default for users without a plan
          await strapi.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: { plan: freePlan.id }
          });
          migratedCount++;
        }
      } catch (error) {
        console.error(`Error migrating user ${user.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Migration completed! ${migratedCount} users migrated, ${errorCount} errors.`);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

module.exports = { migrate };