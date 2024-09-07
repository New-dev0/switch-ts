import Client from "../client/client";
import { Endpoints } from '../client/endpoints';

export interface AnswerCallbackParams {
  callbackId: string;
  text: string;
  url?: string;
  messageId?: number;
  showAlert?: boolean;
  cacheTime?: number;
  appSessionId?: string;
}

export async function answerCallbackQuery(client: Client, params: AnswerCallbackParams): Promise<boolean> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/callback/answer`, {
    method: 'POST',
    body: JSON.stringify({
      type: 'callback',
      callbackQueryId: params.callbackId,
      messageId: params.messageId?.toString() ?? '0',
      text: params.text,
      url: params.url,
      showAlerts: params.showAlert,
      cacheTime: params.cacheTime,
      appSessionId: params.appSessionId,
    }),
  });

  return response;
}

export interface AnswerUIQueryParams {
  uiQueryId: string;
  text?: string;
  url?: string;
  showAlert?: boolean;
  cacheTime?: number;
}

export async function answerUIQuery(params: AnswerUIQueryParams): Promise<boolean> {
  const response = await fetch(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/ui/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'ui',
      uiQueryId: params.uiQueryId,
      text: params.text,
      url: params.url,
      showAlerts: params.showAlert,
      cacheTime: params.cacheTime,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to answer UI query');
  }

  return await response.json();
}


