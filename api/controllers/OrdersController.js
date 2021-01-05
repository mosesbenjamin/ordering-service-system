/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function (req, res) {
    Orders.find({}).exec(function (err, orders) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }

      if (!orders) {
        res.view("add");
      } else if (orders.length > 0) {
        res.view("list", { orders: orders });
      }
    });
  },
  add: function (req, res) {
    res.view("add");
  },
  create: function (req, res) {
    const quantity = req.body.quantity;
    const price = req.body.price;

    Orders.create({ quantity: quantity, price: price }).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }

      res.redirect("/orders/list");
    });
  },
  delete: function (req, res) {
    Orders.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }

      res.redirect("/orders/list");
    });

    return false;
  },
  edit: function (req, res) {
    Orders.findOne({ id: req.params.id }).exec(function (err, order) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }

      res.view("edit", { order: order });
    });
  },
  update: function (req, res) {
    const quantity = req.body.quantity;
    const price = req.body.price;

    Orders.update(
      { id: req.params.id },
      { quantity: quantity, price: price }
    ).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }

      res.redirect("/orders/list");
    });

    return false;
  },
};
