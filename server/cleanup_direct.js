import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = "mongodb://nagaraj1295:NagaChat123@ac-yoi3dwm-shard-00-01.8ara9wa.mongodb.net:27017,ac-yoi3dwm-shard-00-02.8ara9wa.mongodb.net:27017,ac-yoi3dwm-shard-00-00.8ara9wa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yoi3dwm-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully");
    
    const db = client.db("test"); // Replace with actual DB name if known
    const usersColl = db.collection("users");
    const msgsColl = db.collection("messages");

    const userNames = ["Test User", "Nagaraj", "Naga"];
    for (const name of userNames) {
      const user = await usersColl.findOne({ fullName: name });
      if (user) {
        await msgsColl.deleteMany({ $or: [{ senderId: user._id }, { receiverId: user._id }] });
        await usersColl.deleteOne({ _id: user._id });
        console.log(`Deleted user and messages for: ${name}`);
      } else {
        console.log(`User not found: ${name}`);
      }
    }
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();
