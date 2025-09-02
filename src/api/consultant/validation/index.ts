import * as yup from 'yup';

export const ConsultantCreateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  bio: yup
    .string()
    .max(1000, 'Bio cannot exceed 1000 characters')
    .optional(),
  yearsOfExperience: yup
    .number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50')
    .optional(),
  hourlyRate: yup
    .number()
    .min(0, 'Hourly rate cannot be negative')
    .optional(),
  isPaidConsultant: yup
    .boolean()
    .required('isPaidConsultant flag is required'),
  isAvailable: yup
    .boolean()
    .optional(),
  timezone: yup
    .string()
    .optional(),
  rating: yup
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .optional()
});

export const ConsultantUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .optional(),
  bio: yup
    .string()
    .max(1000, 'Bio cannot exceed 1000 characters')
    .optional(),
  yearsOfExperience: yup
    .number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience cannot exceed 50')
    .optional(),
  hourlyRate: yup
    .number()
    .min(0, 'Hourly rate cannot be negative')
    .optional(),
  isPaidConsultant: yup
    .boolean()
    .optional(),
  isAvailable: yup
    .boolean()
    .optional(),
  timezone: yup
    .string()
    .optional(),
  rating: yup
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .optional()
});