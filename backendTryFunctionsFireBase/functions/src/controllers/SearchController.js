const Dev = require('../models/Dev');
const { parseArrayAsString, errorHandling } = require('../utils');

module.exports = {
    async index(req, res) {
        const { latitude,longitude,techs} = req.query;
        try{
            const techsArray = parseArrayAsString(techs);
            const devs = await Dev.find({
                techs:{
                    $in:techsArray
                },
                location:{
                    $near:{
                        $geometry:{
                            type:'Point',
                            coordinates:[longitude,latitude]
                        },
                        $maxDistance:10000,
                    }
                }
            })
            return res.json({devs});
        }catch(err){
            return errorHandling(res,err);
        }
    }
}