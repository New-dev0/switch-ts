# switch-ts

## creating a echo bot
```ts
import Client from "./switch";

const client = new Client(
    "eyJhbGc......3oB3yTI",
);

client.onMessage(async (message) => {
    await message.replyText({"message": message.message});
});

client.start().then(
    () => console.log("Bot Started!"),
);
```