import Joi from "joi";

export const validateCreateTask = (data) => {
    const schema = Joi.object(
        {
            title: Joi.string()
                .trim()
                .max(150)
                .required()
                .messages({
                    "string.base": `"title" must be a string`,
                    "string.empty": `"title" cannot be empty`,
                    "string.max": `"title" must not exceed 150 characters`,
                    "any.required": `"title" is required`,
                }),

            description: Joi.string()
                .trim()
                .max(1000)
                .optional()
                .allow("")
                .messages({
                    "string.base": `"description" must be a string`,
                    "string.max": `"description" must not exceed 1000 characters`,
                }),
        },
        { abortEarly: false }
    );

    return schema.validate(data);
};

export const validateUpdateTask = (data) => {
    const schema = Joi.object(
        {
            title: Joi.string()
                .trim()
                .max(150)
                .optional()
                .messages({
                    "string.base": `"title" must be a string`,
                    "string.max": `"title" must not exceed 150 characters`,
                }),

            description: Joi.string()
                .trim()
                .max(1000)
                .optional()
                .allow("")
                .messages({
                    "string.base": `"description" must be a string`,
                    "string.max": `"description" must not exceed 1000 characters`,
                }),

            status: Joi.string()
                .valid("PENDING", "DONE")
                .optional()
                .messages({
                    "any.only": `"status" must be either PENDING or DONE`,
                }),
        },
        { abortEarly: false }
    ).min(1); 

    return schema.validate(data);
};
