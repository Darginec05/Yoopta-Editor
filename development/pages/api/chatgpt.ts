import type { NextApiRequest, NextApiResponse } from 'next';
// // import { chatGPTHandler } from 'yoopta/chatgpt-server';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// // export default function apiHandler(req, res) {
// //   const response = await chatGPTHandler({
// //     apiKey: '',
// //     orgName: '',
// //     prompt: req.body.prompt,
// //   });

// //   res.status(200).json({ response });
// // }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (!req.body.prompt) {
//     return res.status(400).json({
//       error: 'PromptText is required',
//     });
//   }

//   if (!Array.isArray(req.body.messages)) {
//     return res.status(400).json({
//       error: 'Messages are not an array',
//     });
//   }

//   if (req.body.messages.length === 0) {
//     return res.status(400).json({
//       error: 'Messages are empty',
//     });
//   }

//   openai
//     .createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: req.body.messages,
//       temperature: 0.7,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stream: true,
//     })
//     .then((response) => {
//       console.log('res', response.data);

//       response.data.pipe(res);
//     })
//     .catch(console.error);

//   // console.log('response data', response.data);

//   // res.status(200).json({ data: response.data });
// }

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"role":"assistant"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"Node"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"JS"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" is"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" an"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" open"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-source"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":","},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" cross"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-platform"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":","},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" server"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-side"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" runtime"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" environment"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" that"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" allows"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" developers"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" to"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" build"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" scalable"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" high"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-performance"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" applications"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" using"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" JavaScript"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"."},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" It"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" is"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" built"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" on"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" the"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" V"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"8"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" JavaScript"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" engine"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" used"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" in"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" Google"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" Chrome"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" provides"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" a"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" non"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-blocking"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" I"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"/O"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" model"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" that"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" makes"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" it"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" efficient"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" in"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" handling"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" high"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" volumes"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" of"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" data"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" requests"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"."},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" Node"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"JS"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" is"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" widely"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" used"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" for"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" building"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" web"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" applications"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":","},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" APIs"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":","},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" real"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-time"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" applications"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":","},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" other"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" server"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"-side"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" applications"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"."},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" It"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" also"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" has"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" a"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" large"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" active"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" community"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" of"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" developers"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" who"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" contribute"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" to"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" its"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" growth"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" and"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" development"},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"."},"index":0,"finish_reason":null}]}

// // data: {"id":"chatcmpl-7GusVMONYwamaG6sTe5dkeAV4BZjQ","object":"chat.completion.chunk","created":1684266243,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{},"index":0,"finish_reason":"stop"}]}

// // data: [DONE]

import { OpenAI } from 'openai-streams/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const response = await openai.createChatCompletion(
    {
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
    },
    { responseType: 'stream' },
  );

  console.log('response.data', response.data.pipe);

  response.data.pipe(res);

  // const stream = await OpenAI(
  //   'chat',
  //   {
  //     model: 'gpt-3.5-turbo',
  //     messages: req.body.messages,
  //     temperature: 0.7,
  //     max_tokens: 256,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //     stream: true,
  //   },
  //   {
  //     apiKey: process.env.OPEN_AI_API_KEY,
  //   },
  // );

  // return new Response(stream);
}
