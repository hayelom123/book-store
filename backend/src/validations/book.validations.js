const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createBook = {
  body: Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    discountRate: Joi.number().min(1).max(99).required().label("Discount Rate"),
    coverImage: Joi.string().required().label("Cover Image"),
    price: Joi.number().min(0).required().label("Price"),
  }),
};

const getBook = {
  params: Joi.object({
    id: Joi.string().custom(objectId),
  }),
};
const deleteBook = {
  params: Joi.object({
    id: Joi.string().custom(objectId),
  }),
};
const updateBook = {
  params: Joi.object({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object({
    title: Joi.string().label("Title"),
    description: Joi.string().label("Description"),
    discountRate: Joi.number().min(1).max(99).label("Discount Rate"),
    coverImage: Joi.string().label("Cover Image"),
    price: Joi.number().min(0).label("Price"),
  }),
};

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
