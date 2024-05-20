const express = require('express');
const logRequests = require('./middlewares/logRequests');
const ordersRoutes = require('./routes/orders');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logRequests);
app.use(ordersRoutes);

app.listen(port, () => {
    console.log(`👨‍💻 Server started on port ${port}`);
});
