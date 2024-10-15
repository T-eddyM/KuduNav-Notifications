import admin from "firebase-admin";
import fs from "fs";
import path from "path";


const filename = 'kudunot-firebase-adminsdk-csi12-2bbc9e96d2.json';

const dirname = path.resolve();

let serviceAccountPath = path.join(dirname, 'src', 'constants', filename);

// Check if 'KuduNav-Notifications' is in the path more than once
if ((serviceAccountPath.match(/KuduNav-Notifications/g) || []).length > 1) {
    // Remove one instance of 'KuduNav-Notifications'
    serviceAccountPath = serviceAccountPath.replace(/(.*)(KuduNav-Notifications)(.*)\1/, '$1$2$3');
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
export default admin;