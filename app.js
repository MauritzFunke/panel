// Module imports
import express from 'express';
import layout from 'express-ejs-layouts';
import { createRequire } from 'module';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const require = createRequire(import.meta.url);

// Import configs
const { port, ipAddress } = require('./config.json');

// Route imports
import indexRoute from './routes/index.js';
import apiRoute from './routes/api.js';

const PORT = process.env.PORT || port;

const app = express();

// Express options
app.set('view engine', 'ejs');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'System Information API',
            version: '0.1.0',
            description:
                'A simple web app to monitor and manager a server',
            license: {
                name: 'GNU AGPLv3',
                url: 'https://www.gnu.org/licenses/agpl-3.0.de.html',
            },
            contact: {
                name: 'Mauritz Funke',
                url: 'https://mauritz-funke.de',
                email: 'mail@mauritz-funke.de',
            },
        },
        servers: [
            {
                url: 'http://' + ipAddress + ':' + PORT + '/api/',
            },
        ],
    },
    apis: ['./api/*.js'],
};

const specs = swaggerJSDoc(options);

// Set up routes
app.use('/api', apiRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))

app.use('/static', express.static('./static'));

app.use(layout);
app.set('layout', 'index/layout/layout');
app.use('/', indexRoute);


app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`Server is now running on port ${PORT}`);
});