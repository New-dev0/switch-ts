import Client from 'switch-bots';
import { Button, InlineMarkup, BotCommand} from 'switch-bots';
import * as dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

const client = new Client(process.env.BOT_TOKEN!);

client.setBotCommands([{
    "command": "start",
    "description": "Start the bot",
    "channel": true
},
{
    "command": "help",
    "description": "Show this help message",
    "channel": true
},
{
    "command": "about",
    "description": "About this bot",
    "channel": true
},
{
    "command": "ping",
    "description": "Check bot latency",
    "channel": true
}
])

// Handle /start command
client.onCommand("start", async (message) => {
    await message.replyText({
        message: "👋 Welcome! I'm an example bot.",
        inlineMarkup: new Button().url("Documentation", "https://github.com/New-dev0/switch-bots")
    });
});

// Handle /help command
client.onCommand("help", async (message) => {
    await message.replyText({
        message: "Available commands:\n/start - Start the bot\n/help - Show this help message\n/about - About this bot\n/ping - Check bot latency"
    });
});

// Handle /about command
client.onCommand("about", async (message) => {
    await message.replyText({
        message: "I'm a demo bot built with switch-bots SDK. I can help you test various bot features!"
    });
});

// Handle /ping command
client.onCommand("ping", async (message) => {
    const start = Date.now();
    const msg = await message.replyText({ message: "Pinging..." });
    const latency = Date.now() - start;
    await msg?.editText({ message: `Pong! Latency is ${latency}ms` });
});

// Handle messages
client.onMessage(async (message) => {
    if (message.message.toLowerCase().includes('hello')) {
        await message.replyText({
            message: "Hi there! How can I help you?"
        });
    } else if (message.message.toLowerCase().includes('bye')) {
        await message.replyText({
            message: "Goodbye! Have a great day!"
        });
    }
});

// Start the bot
client.start().then(() => {
    console.log('Bot started successfully!');
}); 