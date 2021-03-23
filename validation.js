//Validation
const Joi = require('@hapi/joi');

const registerValidation = data =>{

    const schema= {
        username: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
        post: Joi.string()
        .min(2)
        .required()
    };
    return Joi.validate(data,schema);

}

const loginValidation = data =>{
 
    const schema= {
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    };
    return Joi.validate(data,schema);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;