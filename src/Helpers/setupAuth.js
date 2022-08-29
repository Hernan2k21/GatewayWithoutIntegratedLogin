const {verifyJwtToken} = require('../Middlewares')
const setupAuth = (app, services) => {
    services.forEach(service => {
        if (service.auth) {
            app.use(service.url, verifyJwtToken, function (req, res, next) {
                req.body.user = req.user
                next();
            });
        }
    });
}

module.exports = setupAuth