// src/server.ts
import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import initialValue from './data/initialValue.json';

const ensureDbDir = async () => {
  const dbDir = join(process.cwd(), 'db');
  try {
    await mkdir(dbDir, { recursive: true });
    console.log('Database directory created or already exists:', dbDir);
  } catch (error) {
    console.error('Failed to create database directory:', error);
    process.exit(1);
  }
};

const createServer = async () => {
  await ensureDbDir();

  const server = Server.configure({
    name: 'yoopta-collab',
    port: 1234,
    extensions: [
      new SQLite({
        database: 'db.sqlite',
      }),
    ],

    async onConnect(data) {
      const { context, documentName } = data;
      console.log(`👤 Client connected to document: ${documentName}`);
      console.log('Connection data:', context);
    },

    async onDisconnect(data) {
      const { context, documentName } = data;
      console.log(`👋 Client disconnected from document: ${documentName}`);
    },

    async onLoadDocument(data) {
      return initialValue;
    },

    async onChange(data) {
      const { documentName } = data;
      console.log(`📝 Document changed: ${documentName}`);
    },
  });

  return server;
};

const startServer = async () => {
  try {
    const server = await createServer();
    await server.listen();

    console.log(`
      🚀 Yoopta collaboration server is running!
      
      URL: ws://localhost:1234
      Mode: ${process.env.NODE_ENV || 'development'}
      Time: ${new Date().toLocaleTimeString()}
      Database: ${join(process.cwd(), 'db', 'documents.sqlite')}
    `);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Обработка необработанных ошибок
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

startServer();
