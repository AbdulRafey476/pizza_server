const Joi = require("joi");
const { Order } = require("../models/order");
const ObjectId = require("mongoose").Types.ObjectId;
Joi.objectId = require("joi-objectid")(Joi);

const order = {
  // Create order
  create: async (req, res) => {
    const { costumer, pizza, quantity, total } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order({ costumer, pizza, quantity, total });
    await order.save();

    res.send(order);
  },

  // Get order
  get: async (req, res) => {
    let order = await Order.find();
    if (!order.length) res.send("No order found.");

    res.send(order);
  },

  // Get order by user_id
  getByUser_id: async (req, res) => {
    const { user_id } = req.params;

    if (!ObjectId.isValid(user_id))
      return res.status(400).send("Invalid costumer");

    let order = await Order.find({ costumer: user_id }).populate('pizza');
    if (!order) return res.status(400).send("No order found.");

    res.send(order);
  },

  // Get order by id
  getById: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid order");

    let order = await Order.findById({ _id: req.params.id });
    if (!order) return res.status(400).send("No order found.");

    res.send(order);
  },

  // Update order
  update: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid order");

    let order = await Order.findById({ _id: req.params.id });
    if (!order) return res.status(400).send("No order found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { costumer, pizza, quantity, total } = req.body;

    order.costumer = costumer;
    order.pizza = pizza;
    order.quantity = quantity;
    order.total = total;

    await order.save();

    res.send(order);
  },

  // Delete order
  delete: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid order");

    let order = await Order.deleteOne({ _id: req.params.id });
    if (order.deletedCount) return res.send("Successfully deleted.");

    res.send("No order found.");
  }
};

// Validate store
const validate = req => {
  const Schema = {
    costumer: Joi.objectId().required(),
    pizza: Joi.objectId().required(),
    quantity: Joi.number().required(),
    total: Joi.number().required()
  };

  return Joi.validate(req, Schema);
};

module.exports = order;
