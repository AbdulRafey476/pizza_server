const Joi = require("joi");
const { Pizza } = require("../models/pizza");
const ObjectId = require("mongoose").Types.ObjectId;

const pizza = {
  // Create pizza
  create: async (req, res) => {
    const { name, description, category, image, type, size, price } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let pizza = await Pizza.findOne({ name });
    if (pizza) return res.status(409).send("Pizza already exists.");

    pizza = new Pizza({
      name,
      description,
      category,
      image,
      type,
      size,
      price
    });
    await pizza.save();

    res.send(pizza);
  },

  // Get pizza
  get: async (req, res) => {
    let pizza = await Pizza.find();
    if (!pizza.length) res.send("No pizza found.");

    res.send(pizza);
  },

  // Get pizza by id
  getById: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid pizza");

    let pizza = await Pizza.findById({ _id: req.params.id });
    if (!pizza) return res.status(400).send("No pizza found.");

    res.send(pizza);
  },

  // Update pizza
  update: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid pizza");

    let pizza = await Pizza.findById({ _id: req.params.id });
    if (!pizza) return res.status(400).send("No pizza found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description, category, image, type, size, price } = req.body;

    pizza.name = name;
    pizza.description = description;
    pizza.category = category;
    pizza.image = image;
    pizza.type = type;
    pizza.size = size;
    pizza.price = price;

    try {
      await pizza.save();
    } catch (ex) {
      res.status(409).send("Pizza already exists");
    }
    res.send(pizza);
  },

  // Delete pizza
  delete: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid pizza");

    let pizza = await Pizza.deleteOne({ _id: req.params.id });
    if (pizza.deletedCount) return res.send("Successfully deleted.");

    res.send("No pizza found.");
  }
};

// Validate store
const validate = req => {
  const Schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(50)
      .required(),
    category: Joi.string()
      .min(5)
      .max(50)
      .required(),
    image: Joi.string()
      .min(5)
      .max(255)
      .uri()
      .required(),
    type: Joi.string()
      .min(5)
      .max(50)
      .required(),
    size: Joi.string()
      .min(5)
      .max(50)
      .required(),
    price: Joi.number()
      .max(50)
      .required()
  };

  return Joi.validate(req, Schema);
};

module.exports = pizza;
