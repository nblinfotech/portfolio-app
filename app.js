const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use('/api', orderRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch(err => console.error('Unable to connect to DB:', err));
