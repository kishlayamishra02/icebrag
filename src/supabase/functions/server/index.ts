import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import * as kv from './kv_store';

// Create Hono app
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  '/*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  })
);

// Health check endpoint
app.get('/make-server-7dc63255/health', (c) => {
  return c.json({ status: 'ok' });
});

// Start the server
const port = parseInt(process.env.PORT || '8000');

// Export the Hono app for serverless environments
export default app;

// Start the server if this file is run directly
if (require.main === module) {
  serve({
    fetch: app.fetch,
    port,
  }, () => {
    console.log(`Server is running on port ${port}`);
  });
}