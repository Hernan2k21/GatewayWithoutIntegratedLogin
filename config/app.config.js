
require('dotenv').config()
const { fixRequestBody } = require('http-proxy-middleware');

module.exports = {
    server:{
        port: process.env.PORT || 8080,
    },
    services:  [
            {   
                url: '/auth/v1',
                auth: false,
                proxy: {
                    target: `${process.env.AUTH_SERVICE_HOST}/v1/auth`,
                    changeOrigin: false,
                    pathRewrite: {
                        [`^/auth/v1`]: '',
                    },
                    onProxyReq: fixRequestBody,
                }
            },
            {   
                url: '/auth/v1/admin',
                auth: true,
                proxy: {
                    target: `${process.env.AUTH_SERVICE_HOST}/v1/auth/admin`,
                    changeOrigin: false,
                    pathRewrite: {
                        [`^/auth/v1/admin`]: '',
                    },
                    onProxyReq: fixRequestBody,
                }
            },
            {   
                url: '/products/v1/',
                auth: true,
                proxy: {
                    target: `${process.env.PRODUCT_SERVICE_HOST}/v1/`,
                    changeOrigin: false,
                    pathRewrite: {
                        [`^/products/v1/`]: '',
                    },
                    onProxyReq: fixRequestBody,
                }
            }
    ]
    
  };
  