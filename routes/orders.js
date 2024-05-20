const express = require('express');
const { v4: uuidv4 } = require('uuid');
const checkOrderExists = require('../middlewares/checkOrderExists');

const router = express.Router();
let orders = [];

router.post('/order', (req, res) => {
    const { order, clientName, price } = req.body;
    const newOrder = { id: uuidv4(), order, clientName, price, status: "Em preparação" };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

router.get('/order', (req, res) => {
    res.json(orders);
});

router.put('/order/:id', checkOrderExists(orders), (req, res) => {
    const { order, clientName, price, status } = req.body;

    if (order) req.order.order = order;
    if (clientName) req.order.clientName = clientName;
    if (price) req.order.price = price;
    if (status) req.order.status = status;

    res.json(req.order);
});

router.delete('/order/:id', checkOrderExists(orders), (req, res) => {
    orders = orders.filter(order => order.id !== req.params.id);
    res.status(204).send();
});

router.get('/order/:id', checkOrderExists(orders), (req, res) => {
    res.json(req.order);
});

router.patch('/order/:id', checkOrderExists(orders), (req, res) => {
    req.order.status = "Pronto";
    res.json(req.order);
});

module.exports = router;
