import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
});

export const returnBookRequest = Joi.object({
    score: Joi.number().min(0).max(10),
});