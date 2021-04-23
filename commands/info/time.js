const fetch =  require('node-fetch')

module.exports = {
name: "time",
aliases: ["whatdatime"],
description: "Get the time!",

run: async(client, message, args) => {

    const url = `https://time.is/AEST`; // Uh the api

    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (e) {
      message.reply("Error", e);
      console.log(e)
    }

    console.log(response)
}}