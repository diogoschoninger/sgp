import Joi from 'joi';

export default {
  register: {
    body: Joi.object({
      name: Joi.string()
        .regex(/^[A-Za-z\s]+$/)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(255).required(),
    }),
  },

  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(255).required(),
    }),
  },
};
