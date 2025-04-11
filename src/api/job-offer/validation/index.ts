import {yup} from "@strapi/utils"; //Importing yup


export const JobOfferCreateSchema = yup.object({
  title: yup.string().required("Title is required"),
  howToApply: yup.string().required("How to apply is required"),
  description: yup.string().required("Description is required"),
  company: yup.number().required("Company is required"),
  salaryFrom: yup.string().optional(),
  salaryTo: yup.string().optional(),
  applyBefore: yup.date().required("Apply before date is required").min(new Date(), "Apply before date must be in the future"),
  workType: yup.string().oneOf(["full-time",
    "part-time",
    "freelance",
    "contract",
    "internship"], "Invalid job type").required("Job type is required"),
  seniorityLevel: yup.string().oneOf(["junior",
    "senior",
    "medium",
    "lead",
    "staff",
    "manager"], "Invalid seniority level").required("Seniority level is required"),
  remoteOptions: yup.string().oneOf(["noRemote",
    "fullRemote",
    "hybrid"], "Invalid remote option").required("Remote option is required"),
})
