# Overview
A discord bot sending a poll message recurrently with a cron.

# Developpement environement
## Node
You need to install node to start the project.
Then you can run the `npm i` command to install all the required packages.

## Environment variables
To provide the environment variables, just make a copy of the `.env.template` file and name it `.env`.
Then you can complete it with your values.

**DISCORD_BOT_TOKEN**: Your discord bot's token
<br>**POLL_CHANNEL_ID**: The channel id where you want the bot to send the poll
<br>**CRON_VALUE**: The CRON value (see [node-cron documentation](https://github.com/node-cron/node-cron#cron-syntax))
<br>**POLL_QUESTION**: The poll question
<br>**POLL_RESPONSES**: The poll answers and reactions (format : `answerA,reactionA;answerB,reactionB`)

## Start the application
To start the application just run `node index.js`.
