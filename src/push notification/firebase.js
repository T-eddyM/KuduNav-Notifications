import admin from "firebase-admin";
import serviceAccount from "../constants/kudunot-firebase-adminsdk-csi12-2bbc9e96d2.json" assert {type: 'json'};

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
export default admin;