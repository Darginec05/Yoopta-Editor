export type GPT35Model = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301';

export type GPT4Model = 'gpt-4' | 'gpt-4-0314' | 'gpt-4-32k' | 'gpt-4-32k-0314';

export type OpenAIChatRole = 'user' | 'assistant' | 'system' | '';

export type Model = GPT35Model | GPT4Model;

export interface OpenAIChatMessage {
  content: string;
  role: OpenAIChatRole;
}

export interface OpenAIChatCompletionChunk {
  id: string;
  object: string;
  created: number;
  model: Model;
  choices: {
    delta: Partial<OpenAIChatMessage>;
    index: number;
    finish_reason: string | null;
  }[];
}

export interface ChatCompletionToken extends OpenAIChatMessage {
  timestamp: number;
}

export interface ChatMessageParams extends OpenAIChatMessage {
  timestamp?: number;
  meta?: {
    loading?: boolean;
    responseTime?: string;
    chunks?: ChatCompletionToken[];
  };
}

export interface ChatMessage extends OpenAIChatMessage {
  timestamp: number;
  meta: {
    loading: boolean;
    responseTime: string;
    chunks: ChatCompletionToken[];
  };
}

// For more information on each of these properties:
// https://platform.openai.com/docs/api-reference/chat
export interface OpenAIStreamingParams {
  apiKey: string;
  model: Model;
  temperature?: number;
  top_p?: number;
  n?: number;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Map<string | number, number>;
  user?: string;
}

export interface FetchRequestOptions {
  headers: Record<string, string>;
  method: 'POST';
  body: string;
  signal?: AbortSignal;
}
