const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
