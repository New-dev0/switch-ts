<div align="center">
  <h1>Switch SDK 🚀</h1>
  <p>A powerful TypeScript SDK for building bots and applications with Switch</p>

  ![npm version](https://img.shields.io/npm/v/switch-bots)
  ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
  ![License](https://img.shields.io/npm/l/switch-bots)
  ![Downloads](https://img.shields.io/npm/dt/switch-bots)
</div>

## 📚 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Examples](#-examples)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [Support](#-support)

## ✨ Features

### Core Features
- 🔥 **Full TypeScript Support** - Complete type definitions for all API methods
- 🚀 **Promise-based API** - Modern async/await syntax
- 🛡️ **Type Safety** - Catch errors before runtime
- 📝 **Auto-completion** - IntelliSense support in VS Code and other IDEs

### Platform Features
- 💬 **Rich Messaging** - Text, media, buttons, and more
- 👥 **Community Management** - Roles, permissions, and moderation
- 🎮 **Game Integration** - Leaderboards and scoring
- 🎨 **Sticker Support** - Create and manage sticker packs
- 🔌 **WebSocket Support** - Real-time updates
- 🔍 **Search Functionality** - Search messages, media, and users

## 📦 Installation

```bash
# Using npm
npm install switch-bots

# Using yarn
yarn add switch-bots

# Using pnpm
pnpm add switch-bots
```

## 🚀 Quick Start

```typescript
import Client from 'switch-bots';

// Initialize client
const client = new Client('YOUR_TOKEN');

// Start receiving updates
await client.start();

// Handle commands
client.onCommand("start", async (message) => {
    await message.replyText({
        message: "Welcome! 👋",
        inlineMarkup: new Button()
            .url("Visit Website", "https://switch.pe")
            .callback("Get Started", "start_flow")
    });
});

// Handle messages
client.onMessage(async (message) => {
    if (message.message.includes('hello')) {
        await message.replyText({ 
            message: "Hi there! How can I help?" 
        });
    }
});
```

## 💡 Examples

### Message Handling

#### Send Rich Messages
```typescript
// Send message with buttons
await client.sendMessage({
    message: "Choose an option:",
    channelId: "channel123",
    inlineMarkup: new Button()
        .url("Website", "https://switch.pe")
        .callback("Click Me", "button_clicked")
});

// Send media with caption
await client.sendMedia({
    file: myFile,
    caption: "Check this out!",
    channelId: "channel123"
});
```

#### Message Actions
```typescript
// Edit message
await message.editText({
    message: "Updated content",
    inlineMarkup: new Button().url("New Link", "https://example.com")
});

// Pin message
await message.pin();

// Add reaction
await message.addReaction("👍");
```

### Community Management

#### Role Management
```typescript
// Create role
await client.createRole("community123", {
    roleName: "Moderator",
    roleColour: "#FF0000",
    permissions: "MODERATE"
});

// Add member to role
await client.addMemberToRole({
    communityId: "community123",
    roleId: 1,
    memberId: userId
});
```

#### Moderation
```typescript
// Ban user
await client.banUser({
    communityId: "community123",
    userId: "user123"
});

// Restrict user
await client.restrictUser({
    communityId: "community123",
    userId: 123,
    restricted: true,
    restrictedTillTimestamp: someTimestamp
});
```

## 📖 API Reference

### Client Methods
- [Message Methods](docs/messages.md)
- [Community Methods](docs/community.md)
- [Bot Methods](docs/bot.md)
- [Media Methods](docs/media.md)
- [Game Methods](docs/games.md)

### Event Handlers
- [Message Handler](docs/handlers.md#message)
- [Command Handler](docs/handlers.md#command)
- [Callback Handler](docs/handlers.md#callback)

## 🛠️ Advanced Usage

### Custom Inline Buttons
```typescript
const markup = new InlineMarkup()
    .addRow()
        .addButton("Click Me", "button1", "callback")
        .addButton("Visit", "https://switch.pe", "url")
    .addRow()
        .addButton("Share", "share_button", "callback");
```

### Game Integration
```typescript
// Update leaderboard
await client.createLeaderboard({
    userId: 123,
    score: 1000,
    level: 5,
    communityId: "community123"
});

// Get rankings
const leaderboard = await client.getGlobalLeaderboard();
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 💬 Support
- [Switch Community](https://switch.click/support)
- [GitHub Issues](https://github.com/New-dev0/switch-ts)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by the Switch Team
</div>