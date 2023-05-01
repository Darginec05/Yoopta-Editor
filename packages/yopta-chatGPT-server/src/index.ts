import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from "openai";

import { TMount } from './types';

export const mount = async ({ app, path, configuration, chatRequestConfig }: TMount) => {
  const openai = new OpenAIApi(new Configuration(configuration));

  app.post(path, async (req: Request, res: Response) => {
    if (!req.body.promptText) {
      return res.status(400).json({
        error: 'promptText is required',
      });
    }

    const response = await openai.createChatCompletion({
      ...chatRequestConfig,
      messages: [{ role: 'user', content: req.body.promptText }],
    });

    res.json(response.data);
  });
}
