const axios = require('axios')
const { ServiceCallError } = require('../Helpers/error')
const logError = (e, req, res, next) => {
  console.log( `Error ${e}`) 
  console.log(e.stack)
  next(e)
}

const sendError = (e, req, res, next) => {
  res.header("Content-Type", 'application/json')
  const status = e.httpCode || 500
  delete e.httpCode
  res.status(status).json(e)
}

const notFound = (req, res, next) => {
  res.status(404)
  res.json({message: 'Route not Found Gateway'})
}
const verifyJwtToken = async (req,res,next) => {
  try {
    try {
      let config = {
        headers: {
          Authorization: req.headers.authorization || ""
        }
      }
      const{ data} = await axios.post('http://localhost:8081/v1/jwt/verify', {}, config)
      req.user = data
      next()
    } catch (e) {
      //To-do check axios error
      throw new ServiceCallError(e)
    }
  } catch (e) {
    next(e)
  }
 
}

module.exports = {logError,sendError, notFound, verifyJwtToken}