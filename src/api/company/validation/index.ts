import {yup} from "@strapi/utils"; //Importing yup

const {object, string, number} = yup; //Destructuring object and string from yup

// Code for UserSchema

export const CompanyCreateSchema = object().shape({
  // Creating BlogCreateSchema
  user: number().required(),
  email: string().required().email(),
  name: string().required().min(2),
  website: string().optional().url(),
  logo: yup.string().url(),
  description: yup.string().required().min(30).max(2000),
});


export const CompanyUpdateSchema = object().shape({
  // Creating BlogCreateSchema
  name: string().optional().min(2),
  linkedIn: string().optional().nullable().url(),
  twitter: string().optional().nullable().url(),
  website: string().optional().url(),
  logo: yup.string().nullable().url(),
  description: yup.string().required().min(30).max(2000),
})
