import admin from "firebase-admin";
import {readFileSync} from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = path.join(process.cwd(), "service-accounts.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.RTDB_URL,
});

export default admin.database();
