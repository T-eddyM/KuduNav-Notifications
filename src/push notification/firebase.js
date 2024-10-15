import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Define the filename and dirname
const filename = '/src/constants/kudunot-firebase-adminsdk-csi12-2bbc9e96d2.json';
const dirname = path.resolve(); // Gets the current working directory
const __filename = path.join(dirname, filename);

const serviceAccount = JSON.parse(fs.readFileSync(__filename, 'utf-8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
export default admin;