// import { chatGPTHandler } from 'yoopta/chatgpt-server';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: 'your key',
});

const openai = new OpenAIApi(configuration);

// export default function apiHandler(req, res) {
//   const response = await chatGPTHandler({
//     apiKey: '',
//     orgName: '',
//     prompt: req.body.prompt,
//   });

//   res.status(200).json({ response });
// }

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.body', req.body.prompt);

  if (!req.body.prompt) {
    return res.status(400).json({
      error: 'PromptText is required',
    });
  }

  if (!Array.isArray(req.body.messages)) {
    return res.status(400).json({
      error: 'Messages are not an array',
    });
  }

  if (req.body.messages.length === 0) {
    return res.status(400).json({
      error: 'Messages are empty',
    });
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.status(200).json({ data: response.data });
}
