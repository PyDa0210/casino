import Joi from 'joi';

const envSchema = Joi.object({
    RAPIDAPI_KEY: Joi.string().required().messages({
        'any.required': 'Falta la variable RAPIDAPI_KEY en .env',
    }),
    MONGO_URI: Joi.string().uri().required().messages({
        'any.required': 'Falta la variable MONGO_URI en .env',
        'string.uri': 'MONGO_URI debe ser una URI válida',
    }),
    PORT: Joi.number().default(5000).messages({
        'number.base': 'PORT debe ser un número',
    }),
    JWT_SECRET: Joi.string().required().messages({
        'any.required': 'Falta la variable JWT_SECRET en .env',
    }),
});

const validateEnv = () => {
    const { error, value } = envSchema.validate(process.env, { allowUnknown: true, abortEarly: false });

    if (error) {
        console.error('Error en las variables de entorno:');
        error.details.forEach((err) => console.error(`- ${err.message}`));
        process.exit(1); // Detiene la aplicación si hay errores
    }

    return value; // Retorna las variables validadas
};

export default validateEnv;
