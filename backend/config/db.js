import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const DEFAULT_ATLAS_URI = 'mongodb://shrmarajn70_db_user:yW7N8U6N7eMYsNHQ@ac-6jtsyz1-shard-00-00.qoiilgr.mongodb.net:27017,ac-6jtsyz1-shard-00-01.qoiilgr.mongodb.net:27017,ac-6jtsyz1-shard-00-02.qoiilgr.mongodb.net:27017/tattoo-studio?ssl=true&replicaSet=atlas-qbrf9h-shard-0&authSource=admin&appName=Cluster0';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || DEFAULT_ATLAS_URI;
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      maxPoolSize: 10,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host} (Persistent Cloud Atlas DB)`);
    mongoMemoryServer = null;
    return conn;
  } catch (error) {
    console.warn(`[Database] Standard MongoDB Atlas connection failed (${error.message}). Attempting local MongoDB connection...`);
    
    try {
      const localUri = 'mongodb://127.0.0.1:27017/tattoo-studio';
      const conn = await mongoose.connect(localUri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`[Database] Connected to Local MongoDB: ${localUri}`);
      mongoMemoryServer = null;
      return conn;
    } catch (localError) {
      console.warn(`[Database] Local MongoDB not available (${localError.message}). Initializing In-Memory MongoDB Server...`);
      
      try {
        mongoMemoryServer = await MongoMemoryServer.create({
          instance: {
            dbName: 'tattoo-studio'
          },
          spawn: {
            timeout: 60000
          }
        });
        const memUri = mongoMemoryServer.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`[Database] In-Memory MongoDB Server active at: ${memUri} (WARNING: Temporary RAM storage)`);
        return conn;
      } catch (memError) {
        console.error('[Database] Failed to initialize In-Memory MongoDB:', memError.message);
        throw memError;
      }
    }
  }
};

export const getDbInfo = () => {
  const isMemory = Boolean(mongoMemoryServer);
  return {
    isPersistent: !isMemory,
    isMemory,
    host: mongoose.connection.host || 'unknown',
    database: mongoose.connection.name || 'tattoo-studio',
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    type: !isMemory ? 'MongoDB Atlas (Persistent Cloud)' : 'In-Memory RAM (Temporary Fallback)',
    whitelistRequired: isMemory,
  };
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
