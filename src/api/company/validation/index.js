

const { yup } = require("@strapi/utils"); //Importing yup
const { object, string, number } = yup; //Destructuring object and string from yup

// Code for UserSchema

const CompanyCreateSchema = object().shape({
  // Creating BlogCreateSchema
  user: number().required(),
  email: string().required().email(),
  name: string().required().min(2),
  website: string().optional().url(),
  logo: yup.string().url(),
  description: yup.string().required().min(30).max(2000),
});

module.exports = {
  CompanyCreateSchema,
};
