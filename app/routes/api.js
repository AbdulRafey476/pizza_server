const express = require("express");
const router = express.Router();

// Auth controllers
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const me = require("../controllers/auth/me");
const { verification, resent } = require("../controllers/auth/verification");
const forgot = require("../controllers/auth/password/forgot");
const reset = require("../controllers/auth/password/reset");

// Pizza controllers
const pizza = require("../controllers/pizza");
// Order controllers
const order = require("../controllers/order");

// Middelwares
const auth = require("../middleware/auth");
const verified = require("../middleware/verified");
const admin = require("../middleware/roles/admin");
const editor = require("../middleware/roles/editor");
const subscriber = require("../middleware/roles/subscriber");
const costumer = require("../middleware/roles/costumer");

// Auth apis
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/verification/:uid/:token", verification);
router.post("/forgot", forgot);
router.post("/password/reset/:uid/:token", reset);

// Pizza apis
router.post("/pizza", pizza.create);
router.get("/pizza", pizza.get);
router.get("/pizza/:id", pizza.getById);
router.put("/pizza/:id", pizza.update);
router.delete("/pizza/:id", pizza.delete);

// Order apis
router.post("/order", order.create);
router.get("/order", order.get);
router.get("/order/:id", order.getById);
router.put("/order/:id", order.update);
router.delete("/order/:id", order.delete);
router.get("/order/customer/:user_id", order.getByUser_id);

module.exports = router;
