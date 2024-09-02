import joi from 'joi';

const register = joi.object({
  name: joi.string().min(3).max(32).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(64).required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(64).required(),
});

export default { register, login };
