const {Client, GatewayIntentBits} = require('discord.js');

const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN;
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

client.once('ready', () => {
    console.log(`DISCORD_APP_TOKEN: ${DISCORD_APP_TOKEN}`)
    console.log(`DISCORD_SERVER_ID: ${DISCORD_SERVER_ID}`)
    console.log(`DISCORD_CHANNEL_ID: ${DISCORD_CHANNEL_ID}`)
    console.log('Bot is ready!');
});

client.on('guildMemberAdd', member => {
    console.log('member added.')
    console.log(member);
    if (member.guild.id !== DISCORD_SERVER_ID) return;
    member.guild.channels.cache.get(DISCORD_CHANNEL_ID).send(`${member.user} joined ${member.guild.name}!`);
});

client.on('guildMemberRemove', member => {
    console.log('member removed.')
    console.log(member);
    if (member.guild.id !== DISCORD_SERVER_ID) return;
    member.guild.channels.cache.get(DISCORD_CHANNEL_ID).send(`${member.user} left.`);
});

if (DISCORD_APP_TOKEN !== null && DISCORD_APP_TOKEN !== '') {
    client.login(DISCORD_APP_TOKEN);
} else {
    console.error('DISCORD_APP_TOKEN is empty...please check your environment variable.')
}