const Joi = require("joi");

const roles = require("./roles");

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(4).email().required(),
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
  });

  return schema.validate(user);
};

const validateAuth = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(user);
};

const validateProject = (project) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    description: Joi.string().min(4),
  });

  return schema.validate(project);
};

const validateAddMember = (info) => {
  const schema = Joi.object({
    projectID: Joi.number().required(),
    role: Joi.string()
      .valid(...Object.values(roles))
      .required(),
  });

  return schema.validate(info);
};

const validateAddConv = (name) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(name);
};

module.exports = {
  validateUser,
  validateAuth,
  validateProject,
  validateAddMember,
  validateAddConv,
};
