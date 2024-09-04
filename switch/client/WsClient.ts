import { Data, WebSocket } from "ws";
import { v4 as uuid } from "uuid";

export class WsClient {
    private ws: WebSocket | null = null;
    private url: string;
    private topic: string;

    private connected: boolean = false;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;
    private reconnectInterval: number = 5000; // 5 seconds
    private onMessageCallback: ((x) => any) | null;

    // Bearer token for authentication
    private token: string;

    constructor(
        url: string,
        token: string,
        topic: string,
        onMessageCallback: ((x) => any) | null = null,
    ) {
        this.url = url;
        this.token = token;
        this.topic = topic;
        this.onMessageCallback = onMessageCallback;
    }

    // Connect to the WebSocket server
    connect(): void {
        this.ws = new WebSocket(this.url, {
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "accept-version": "1.1,1.0",
                "heart-beat": "10000,10000",
            },
        });

        this.ws.on("open", () => {
            console.log("Connected to WebSocket server");

            this.connected = true;
            this.reconnectAttempts = 0;
            this.sendConnectFrame();
        });

        this.ws.on("message", (data: Data) => {
            const message = data.toString();
            this.processMessage(message);
        });

        this.ws.on("close", (code: number, reason: string) => {
            console.log(`WebSocket closed. Code: ${code}, Reason: ${reason}`);
            this.connected = false;
            this.reconnect();
        });

        this.ws.on("error", (error: Error) => {
            console.error("WebSocket error:", error);
            this.connected = false;
            this.reconnect();
        });
    }

    // Send a STOMP frame
    private async sendFrame(
        command: string,
        headers: Record<string, string> = {},
        body: string = "",
    ): Promise<void> {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not open. Cannot send frame.");
            return;
        }

        const headerLines = Object.entries(headers)
            .map(([key, value]) => `${key}:${value}`)
            .join("\n");
        const frame = `${command}\n${headerLines}\n\n${body}\x00`;
        this.ws.send(frame);
        console.log(`Sent ${command} frame:`, frame);
    }

    // Send a CONNECT frame
    private async sendConnectFrame(): Promise<void> {
        await this.sendFrame("CONNECT", {
            "accept-version": "1.1,1.0",
            "heart-beat": "10000,10000",
            "Authorization": `Bearer ${this.token}`,
        });
    }

    // Send a SUBSCRIBE frame
    private async sendSubscribeFrame(): Promise<void> {
        await this.sendFrame("SUBSCRIBE", {
            "destination": this.topic,
            "Authorization": `Bearer ${this.token}`,
            "id": `sub-${uuid()}`,
        });
    }

    // Send a DISCONNECT frame
    private async sendDisconnectFrame(): Promise<void> {
        await this.sendFrame("DISCONNECT");
    }

    // Process incoming messages
    public async processMessage(message: string) {
        if (message.startsWith("MESSAGE")) {
            const Message = message.slice(0, -1).split("\n\n", 2);
            const JSONMessage = JSON.parse(Message[Message.length - 1]);
            console.log("Received MESSAGE:", JSONMessage);

            if (this.onMessageCallback) {
                this.onMessageCallback(JSONMessage);
            }
        } else if (message.startsWith("ERROR")) {
            console.error("Received ERROR:", message);
        } else if (message.startsWith("CONNECTED")) {
            console.log("Received CONNECTED:", message);
            await this.sendSubscribeFrame();
        } else {
            if (message.trim().length > 0) {
                console.debug("Unhandled frame:", message);
            }
        }
    }

    // Reconnect to the WebSocket server
    private reconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(
                `Attempting to reconnect... (Attempt ${this.reconnectAttempts})`,
            );
            setTimeout(() => this.connect(), this.reconnectInterval);
        } else {
            console.error("Max reconnection attempts reached. Giving up.");
        }
    }

    // Send a message to the WebSocket server
    public async sendMessage(message: string): Promise<void> {
        await this.sendFrame("SEND", {
            "destination": this.topic,
        }, message);
        console.log("Message sent:", message);
    }

    // Disconnect from the WebSocket server
    public async disconnect(): Promise<void> {
        if (this.ws) {
            await this.sendDisconnectFrame();
            this.ws.close();
            console.log("Disconnected from WebSocket server");
        }
    }
}
