import Joi from "joi";

/**
 * Register Validation Schema
 */
export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter valid email",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be minimum 6 characters",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase and number",
    }),

  role: Joi.string().valid("student", "instructor", "admin").optional(),
});

/**
 * Login Validation Schema
 */
export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter valid email",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
