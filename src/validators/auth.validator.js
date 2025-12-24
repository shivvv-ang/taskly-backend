import Joi from "joi";

export const validateRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.base": `"name" should be a type of text`,
                "string.empty": `"name" cannot be empty`,
                "string.min": `"name" should have a minimum length of {#limit}`,
                "any.required": `"name" is a required field`
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.base": `"email" should be a type of text`,
                "string.empty": `"email" cannot be empty`,
                "string.email": `"email" must be a valid email format`,
                "any.required": `"email" is a required field`
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "string.base": `"password" should be a type of text`,
                "string.empty": `"password" cannot be empty`,
                "string.min": `"password" should have a minimum length of {#limit}`,
                "any.required": `"password" is a required field`
            }),
    }, { abortEarly: false });

    return schema.validate(data);
};


export const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.base": `"email" should be a type of text`,
                "string.empty": `"email" cannot be empty`,
                "string.email": `"email" must be a valid email format`,
                "any.required": `"email" is a required field`
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "string.base": `"password" should be a type of text`,
                "string.empty": `"password" cannot be empty`,
                "string.min": `"password" should have a minimum length of {#limit}`,
                "any.required": `"password" is a required field`
            }),
    }, { abortEarly: true })

    return schema.validate(data);
}