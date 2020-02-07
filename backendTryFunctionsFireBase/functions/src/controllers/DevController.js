
const axios = require('axios');
const Dev = require('../models/Dev');
const { parseArrayAsString, logger, errorHandling } = require('../utils');


module.exports = {
    async index(rep,res){
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req,res) {
        try{
            const {github_username, techs,latitude, longitude} = req.body;
            let devDB = await Dev.findOne({github_username});
            if(!devDB){
                const response = await axios.get(`https://api.github.com/users/${github_username}`);
                const {name = login, avatar_url, bio } = response.data;
                
                logger.info(`storing... dev name: ${name} `);
                const techsArray = parseArrayAsString(techs);
                const location = {
                    type: 'Point',
                    coordinates:[longitude,latitude]
                }
                const dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });    
                return res.status(201).json({message: `success`, data: dev});
            } 
            return res.status(403).json({message:`dev already exists`});
        }catch(err){
            return errorHandling(res,err);
        }
         
    },
    async update(req,res){
        const { id } = req.params;
        const {github_username, techs,latitude, longitude} = req.body;
        const response = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login, avatar_url, bio } = response.data;
        const techsArray = parseArrayAsString(techs);
        const location = {
            type: 'Point',
            coordinates:[longitude,latitude]
        }

        const dev = Dev.findByIdAndUpdate(id,{techs: techsArray,location,avatar_url,bio},(err,result)=>{
            if (err){
                return err;
            }
            return result;
        });
        return res.json({message: `success`, data: dev});
    },
    async destroy(req,res){
        const { id } = req.params;
        logger.info(`Deleting dev id: ${id}`)
        const dev = Dev.findByIdAndDelete(id).then((doc)=>doc);
        return res.json({dev});
    },
}