import Joi from 'joi';

export const createBookSchema = Joi.object({
    name: Joi.string().min(3).required(),
    average_rating: Joi.number().min(0).max(10),
});
