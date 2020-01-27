
const axios = require('axios');
const Dev = require('../models/Dev');


module.exports = {
    async index(rep,res){
        const devs = await Dev.find();
    },
    async store(req,res) {
        const {github_username, techs,latitude, longitude} = req.body;
        let dev = Dev.findOne({github_username});
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio } = response.data;
        
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
        return res.json({message: `Hello ${name}`, data: dev});
    },
    async update(){

    },
    async delete(){

    },
}