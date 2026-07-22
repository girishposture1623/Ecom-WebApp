
import mongoose from "mongoose";

import dns from "dns"


dns.setServers(["1.1.1.1", "8.8.8.8"])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'Shoplix-mern'
        })
       
            console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;