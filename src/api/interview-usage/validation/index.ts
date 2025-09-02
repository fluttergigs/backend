import * as yup from 'yup';

export const SubscriptionUpdateSchema = yup.object().shape({
  subscriptionStatus: yup
    .string()
    .oneOf(['free', 'paid'], 'Subscription status must be either "free" or "paid"')
    .required('Subscription status is required'),
  subscriptionId: yup
    .string()
    .nullable()
    .optional()
});

export const UsageIncrementSchema = yup.object().shape({
  // Currently no additional data needed for increment, but keeping for future extensions
});