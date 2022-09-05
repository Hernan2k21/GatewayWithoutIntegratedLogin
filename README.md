# Node js Gateway

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | App listening port          | 8080   |
|AUTH_SERVICE_HOST| Auth service host|http://localhost:8085


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.16


# Getting started
- Clone the repository
```
git clone  https://github.com/Hernan2k21/GatewayWithoutIntegratedLogin.git
```
- Install dependencies
```
cd GatewayWithoutIntegratedLogin
npm install
```
- Run the project
```
npm run dev
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **config**                 | Application configuration file including environment configs |
| **node_modules**         | Contains all  npm dependencies                                                            
| **src/Helpers**      | Contains Helper functions   
| **src/Middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/Responses**           | Contains http responses |
| **src/Routes**           | Contain all express routes, separated by module/area of application      
| **src/Validations**      | Request schema validations                 
| index.js         | Entry point to express app                                                               
| package.json             | Contains npm dependencies




## Adding microservice in config
Microservices that are exposed by the gateway service must be declared inside the config file


### Example declaring a microservice
```
.......
services: [
		{

			url:  'exposedEndpoint',

			auth:  false,

			proxy: {

				target:  'targetEndpoint',

				changeOrigin:  false,

				pathRewrite: {

					[`^targetEndpoint`]:  '',

					},

				onProxyReq:  fixRequestBody,

			}
}
....
```
