const TelegramBot = require('node-telegram-bot-api');


const token = process.env.sambot_token;


const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {



    bot.sendMessage(
        msg.chat.id,
        "Welcome to Sambot! The Bot that gives weather for global cities! Do /city then type in the city name to see weather information."
    );
});

bot.onText(/\/city/, (msg) => {
    bot.once("message", (msg) => {
        fetchSambot(msg.text.toString().toLowerCase()).then((data) => {

            bot.sendMessage(
                msg.chat.id,
                `City: ${data.location.name} \nTemperature: ${data.current.temperature} Degrees Celsius \nWeather Condition: ${data.current.weather_descriptions} \nHumidity: ${data.current.humidity}%`

            )
        }
        )
    })



    bot.sendMessage(
        msg.chat.id,
        "Please type in the city name!"
    );
});


bot.on('message', (msg) => {

    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello Person!");


    }

});
bot.onText(/\/help/, (msg) => {



    bot.sendMessage(msg.chat.id, "Type /city then type city name");


}

);


const fetch = require("isomorphic-unfetch");

function fetchSambot(city) {
    return fetch(`http://api.weatherstack.com/current?access_key=${process.env.sambot_api}&query=${city.toLowerCase()}`)
        .then((rawData) => rawData.json())
        .then((data) => {
            return data;
        });
}











