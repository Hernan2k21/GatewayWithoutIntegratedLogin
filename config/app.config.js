
require('dotenv').config()
const { fixRequestBody } = require('http-proxy-middleware');

module.exports = {
    server:{
        port: 8080,
    },
    services:  [
            {   
                url: '/auth/v1',
                auth: false,
                proxy: {
                    target: "http://localhost:8081/v1/auth",
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
                    target: "http://localhost:8081/v1/auth/admin",
                    changeOrigin: false,
                    pathRewrite: {
                        [`^/auth/v1/admin`]: '',
                    },
                    onProxyReq: fixRequestBody,
                }
            }
    ]
    
  };
  