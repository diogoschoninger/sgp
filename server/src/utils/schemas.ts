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
      description: Joi.string().required(),
      value: Joi.string().required(),
      date: Joi.date().required(),
      user_owner: Joi.number().required(),
      payment: Joi.number().required(),
      group: Joi.number().required(),
      side: Joi.number().required(),
    }).or('group'),
  },

  listFinOperations: {
    body: Joi.object({
      user_id: Joi.number().required(),
    }),
  },
};
