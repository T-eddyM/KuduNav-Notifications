import admin from "firebase-admin";
import fs from "fs";
import path from "path";


const filename = 'kudunot-firebase-adminsdk-csi12-2bbc9e96d2.json';

const dirname = path.resolve();

let serviceAccountPath = path.join(dirname, 'src', 'constants', filename);

const pathSegments = serviceAccountPath.split(path.sep);

const occurrences = pathSegments.filter(segment => segment === 'KuduNav-Notifications').length;

if (occurrences > 1) {
    // Remove one instance of 'KuduNav-Notifications'
    serviceAccountPath = serviceAccountPath.replace(/(KuduNav-Notifications)(?=.*KuduNav-Notifications)/, '');
}

// Trim any potential leading/trailing slashes after modification
serviceAccountPath = serviceAccountPath.replace(/\/{2,}/g, '/');

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
export default admin;