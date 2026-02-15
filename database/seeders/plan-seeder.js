/**
 * Plan seeder
 * Creates the default subscription plans
 */

async function seed(strapi) {
  // Check if plans already exist
  const existingPlans = await strapi.entityService.findMany('api::plan.plan');
  
  if (existingPlans.length > 0) {
    console.log('Plans already exist, skipping seeding...');
    return;
  }

  // Create the default plans
  const plans = [
    {
      name: 'free',
      displayName: 'Free Plan',
      interviewsPerMonth: 3,
      isActive: true,
      description: 'Basic plan with limited interview sessions',
      features: ['3 interview sessions per month', 'Basic question bank', 'Progress tracking']
    },
    {
      name: 'paid',
      displayName: 'Premium Plan',
      interviewsPerMonth: 20,
      isActive: true,
      description: 'Premium plan with extended interview sessions',
      features: ['20 interview sessions per month', 'Full question bank', 'Advanced analytics', 'Priority support']
    }
  ];

  for (const planData of plans) {
    try {
      const createdPlan = await strapi.entityService.create('api::plan.plan', {
        data: planData
      });
      console.log(`Created plan: ${createdPlan.name}`);
    } catch (error) {
      console.error(`Error creating plan ${planData.name}:`, error);
    }
  }

  console.log('Plan seeding completed!');
}

module.exports = { seed };