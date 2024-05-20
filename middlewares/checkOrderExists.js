const checkOrderExists = (orders) => (req, res, next) => {
    const { id } = req.params;
    const order = orders.find(order => order.id === id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    req.order = order;
    next();
};

module.exports = checkOrderExists;
