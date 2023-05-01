# `yopta-chatGPT-server`

> Mount the route to your express app to handle requests to chatGPT.

## Usage

```
const express = require('express');
const { mount } = require('yopta-chatGPT-server');

const app = express();

mount({
  app,
  path: '/chatGPT',
  configuration: {
    apiKey: 'YOUR_API_KEY',
    organization: 'YOUR_ORGANIZATION',
  }
  chatRequestConfig: {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    stream: true,
  }
});
```
