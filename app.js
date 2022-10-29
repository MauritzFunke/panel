// Module imports
import express from 'express';
import layout from 'express-ejs-layouts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import configs
const { port } = require('./config.json');

// Route imports
import indexRoute from './routes/index.js';
import apiRoute from './routes/api.js';

const PORT = process.env.PORT || port;

const app = express();

// Express options
app.set('view engine', 'ejs');


// Set up routes
app.use('/api', apiRoute);

app.use('/static', express.static('./static'));

app.use(layout);
app.set('layout', 'index/layout/layout');
app.use('/', indexRoute);


app.listen(PORT, (err) => {
    if(err) throw err;
    else console.log(`Server is now running on port ${PORT}`);
});