const logger  = require('./logger'); 
module.exports = (res,error)=>{
    logger.error(error);
    return res.status(500).json({message:`An error has occurred`});
}