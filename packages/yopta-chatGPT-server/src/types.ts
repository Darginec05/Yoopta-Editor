import Express from 'express';
import { ConfigurationParameters, CreateChatCompletionRequest } from "openai";

export type TMount = {
  app: Express,
  path: string,
  configuration: ConfigurationParameters,
  chatRequestConfig: Omit<CreateChatCompletionRequest, 'messages'>
}
