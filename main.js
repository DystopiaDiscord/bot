//Modules
const Discord = require("discord.js");
const http = require('http');
const express = require('express');
const app = express();
require('http').createServer().listen(3000)

//Truc du vps
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 200000);

//Var
const bot = new Discord.Client();
let prefix = "r.";

bot.login(process.env.TOKEN)

//Status
bot.on("ready", () => {
    console.log("Bot Prêt !");
    bot.user.setActivity("Discord SHIELD | Gestion des mails", {type: "STREAMING", url:"https://twitch.tv/thetoppazze"});
});

//MP
bot.on("message", message => {
    if(message.content.startsWith(prefix + "mp")){
        message.delete()

        if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Mauvaises permissions");

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let toSend = bot.users.find("id", args[1]);
        let msg = args.slice(2).join(' ');

        const embed = new Discord.RichEmbed()
        .setColor("#cc99ff")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(msg)
        toSend.sendEmbed(embed);
        message.channel.send("Message envoyé ! En voici une copie.");
        message.channel.sendEmbed(embed);
    } 
});

//Staff Only
bot.on("message", message => {
    if(message.channel.id === "573787915612586024"){
        message.delete()

        const args = message.content

        let toSend = message.guild.channels.find("id", "573789677015007232");

        const embed = new Discord.RichEmbed()
        .setColor("#cc99ff")
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField("**Expéditeur**", `${message.author.tag} | ${message.author.id}`, true)
        .setDescription(args)
        .setTimestamp()
        toSend.sendEmbed(embed);
    }
});
