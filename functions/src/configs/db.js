import admin from "firebase-admin";
import {readFileSync} from "fs";
import dotenv from "dotenv";

dotenv.config();
const serviceAccount = JSON.parse(readFileSync("service-accounts.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.RTDB_URL,
});

export default admin.database();
