import * as yup from 'yup';

export const SubscriptionUpdateSchema = yup.object().shape({
  planName: yup
    .string()
    .oneOf(['free', 'paid'], 'Plan name must be either "free" or "paid"')
    .required('Plan name is required'),
  subscriptionId: yup
    .string()
    .nullable()
    .optional()
});

export const UsageIncrementSchema = yup.object().shape({
  // Currently no additional data needed for increment, but keeping for future extensions
});