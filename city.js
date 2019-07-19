const express = require('express');
const router = express.Router();
const request_ = require('request-promise');
const {City} = require('./models/citymodel');

async function getWeather(cities) {
    const city_weather_data = [];
    for (const city of cities) {
        const city_ = city.name;
        const url =`http://api.openweathermap.org/data/2.5/weather?q=${city_}&appid=2b8d48363cb3040071d2f7a028ba5889`
        
        const weather_response_body = await request_(url);

        const json_parse_weather = JSON.parse(weather_response_body);

        const weather = {
            city: city,
            temperature: Math.round(json_parse_weather.main.temp),
            description:json_parse_weather.weather[0].description,
            // icon: json_parse_weather.weather[0].icon
        };

        city_weather_data.push(weather);
    }

    return city_weather_data;
}

router.get('/', async (req, res) => {
    await City.find({}, (err, cities)=>{
        getWeather(cities)
            .then((results)=>{
                const weather_data = {weather_data: results};
                res.json({
                    message: 'getting cities weather info', 
                    cities: weather_data
                });
            })
    }).sort('name').select('name -_id');
    
});

router.post('/', async (req, res) => {
    const city = new City({ name: req.body.name });
    
    await city.save();
    res.status(200).send(`city ${city} saved to database.`);
});


module.exports = router;