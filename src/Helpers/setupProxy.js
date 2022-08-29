
const { createProxyMiddleware} = require('http-proxy-middleware');

const setupProxies = (app, services) => {
    services.forEach(service => {
        app.use(service.url,
            createProxyMiddleware(service.proxy)
            )
    })
}

exports.setupProxies = setupProxies