import Joi from 'joi';

export default {
  register: {
    body: Joi.object({
      name: Joi.string()
        .regex(/^[a-zA-Zà-úÀ-Ú\s]+$/)
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

  createFinOperation: {
    body: Joi.object({
      date: Joi.date().required(),
      description: Joi.string().required(),
      group: Joi.number().required(),
      payment: Joi.number().required(),
      side: Joi.number().required(),
      value: Joi.string().required(),
      userOwner: Joi.number().required(),
    }),
  },
};
