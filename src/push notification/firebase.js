import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const filename = 'kudunot-firebase-adminsdk-csi12-2bbc9e96d2.json';
const dirname = path.resolve();
const __filename = path.join(dirname, 'src/constants', filename);

const serviceAccount = JSON.parse(fs.readFileSync(__filename, 'utf-8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
export default admin;