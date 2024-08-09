import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import initValue from './initValue.json';
import * as Y from 'yjs';

// Minimal hocuspocus server setup with logging. For more in-depth examples
// take a look at: https://github.com/ueberdosis/hocuspocus/tree/main/demos/backend
const server = Server.configure({
  port: parseInt(process.env.PORT ?? '', 10) || 1234,

  extensions: [
    new Logger(),
    // new SQLite({
    //   database: 'db.sqlite',
    // }),
  ],

  async onLoadDocument(data) {
    return data.document;
  },
});

server.enableMessageLogging();
server.listen();
