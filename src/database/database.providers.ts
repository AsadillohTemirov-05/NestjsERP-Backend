import { MongoClient } from 'mongodb';
import { Provider } from '@nestjs/common';


let cachedClient: MongoClient | null = null;

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const uri = process.env.MONGO_URI;
      const dbName = process.env.MONGO_DB_NAME;
      const env = process.env.NODE_ENV || 'development';

      if (!uri) {
        throw new Error('MONGO_URI is not defined');
      }

      if (!dbName) {
        throw new Error('MONGO_DB_NAME is not defined');
      }

      if (!cachedClient) {
        const client = new MongoClient(uri);

        await client.connect();

        cachedClient = client;

        console.log(
          ` MongoDB connected successfully | DB: ${dbName} | ENV: ${env}`,
        );
      }

      return cachedClient.db(dbName);
    },
  },
];
