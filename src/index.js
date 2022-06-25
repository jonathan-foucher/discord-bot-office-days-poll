const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');
const {Client, Intents, MessageEmbed} = require('discord.js');

const logger = require('./common/logger');

dotenv.config({path: path.resolve(__dirname, '../.env')});

const botToken = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.POLL_CHANNEL_ID;
const cronValue = process.env.CRON_VALUE;
const pollQuestion = process.env.POLL_QUESTION;
const pollResponses = process.env.POLL_RESPONSES.replaceAll('\\n', '\n');
const pollReactions = process.env.POLL_REACTIONS.split(',');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.login(botToken);

const exampleEmbed = new MessageEmbed()
    .setColor('#4f80de')
    .setTitle(pollQuestion)
    .setDescription(pollResponses)
    .setTimestamp();

cron.schedule(cronValue, () => {
    logger.info('Cron activated');
    if (client && client.isReady()) {
        logger.info('Sending poll');
        client.channels.fetch(channelId)
            .then(channel => channel.send({content: '@everyone', embeds: [exampleEmbed]})
                .then(message => pollReactions.forEach(reaction =>  message.react(reaction)))
                .catch(logger.error)
            )
            .catch(logger.error);
    }
});
