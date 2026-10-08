import "server-only";
import { MongoClient } from "mongodb";
const mongoGlobal = globalThis as typeof globalThis & { bazardorMongo?: MongoClient };
export function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required to enable authentication.");
  if (!mongoGlobal.bazardorMongo) {
    mongoGlobal.bazardorMongo = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  }
  return mongoGlobal.bazardorMongo;
}
