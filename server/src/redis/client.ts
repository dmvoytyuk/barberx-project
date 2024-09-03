import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

client.on('connect', () => {
  console.log('Redis Client connected');
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

export default client;
