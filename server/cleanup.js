import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";
import Message from "./src/models/message.model.js";

dotenv.config();

const deleteUsers = async () => {
  try {
    // Try direct connection string to bypass SRV lookup issues
    const directUri = "mongodb://nagaraj1295:NagaChat123@ac-yoi3dwm-shard-00-01.8ara9wa.mongodb.net:27017,ac-yoi3dwm-shard-00-02.8ara9wa.mongodb.net:27017,ac-yoi3dwm-shard-00-00.8ara9wa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yoi3dwm-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(directUri);
    console.log("Connected to MongoDB");

    const userNames = ["Test User", "Nagaraj", "Naga"];
    
    for (const name of userNames) {
      const users = await User.find({ fullName: name });
      if (users.length > 0) {
        for (const user of users) {
          // Delete messages associated with this user
          const msgResult = await Message.deleteMany({
            $or: [{ senderId: user._id }, { receiverId: user._id }]
          });
          console.log(`Deleted ${msgResult.deletedCount} messages for user: ${name} (${user._id})`);

          // Delete the user
          await User.deleteOne({ _id: user._id });
          console.log(`Deleted user: ${name} (${user._id})`);
        }
      } else {
        console.log(`User not found: ${name}`);
      }
    }

    console.log("Cleanup complete");
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
};

deleteUsers();
