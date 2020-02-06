
const axios = require('axios');
const Dev = require('../models/Dev');
const parseArrayAsString = require('../utils/parseStringAsArray')


module.exports = {
    async index(rep,res){
        console.log(`get devs`)
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req,res) {
        const {github_username, techs,latitude, longitude} = req.body;
        let dev = await Dev.findOne({github_username});
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio } = response.data;
            
            console.log(`storing... dev name: ${name} `);
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
        }  
        return res.json({message: `success`, data: dev});
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
        console.log(`Deleting dev id: ${id}`)
        const dev = Dev.findByIdAndDelete(id).then((doc)=>doc);
        return res.json({dev});
    },
}