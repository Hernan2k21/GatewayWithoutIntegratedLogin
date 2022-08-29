const express = require("express"); 
const {port} = require('./config/app.config')['server']
const services = require('./config/app.config')['services']
const {logError, sendError, notFound} = require('./src/Middlewares')
const {setupProxies} = require("./src/Helpers/setupProxy");
const setupAuth = require("./src/Helpers/setupAuth");
const setupLogger = require('./src/Helpers/setupLogger')

const app = express(); 

app.use(
    express.json({
        limit: '50mb',
    })
);

setupLogger(app)
// const routes = require('./src/Routes');

app.get("/health", async (req, res) => { 
    res.status(200).send('ok')
}); 

// app.use('/v1', routes)
setupAuth(app, services)
setupProxies(app, services);

app.use(logError)
app.use(sendError)
app.use(notFound)

app.listen(port, () => { 
    console.log(`API is listening on port ${port}`); 
});