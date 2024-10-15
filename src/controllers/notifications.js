import dotenv from "dotenv";
import admin from "../push notification/firebase.js"

import Notification from "../collections/Notification.js";
import Device from "../collections/Device.js";

dotenv.config();

export const sendNotification = async (notification) => {
    try {
      // Fetch the device tokens for all targeted users
      const devices = await Device.find({
        userId: { $in: notification.targetedUsers }, // Find devices with userId in targetedUsers array
      });
  
      // If no devices found return
      if (devices.length === 0) {
        console.log(`No devices found for targeted users: ${notification.targetedUsers}`);
        return;
      }
  
      // FCM message payload for each device
      const messages = devices.map((device) => ({
        notification: {
          title: notificarion.type,
          body: notification.message,
        },
        token: device.deviceToken, // Device token for each user
      }));
  
      // Send notifications via FCM in batch
      const response = await admin.messaging().sendAll(messages);
      console.log(`Notifications sent for notification ${notification._id}:`, response.successCount);
  
      // Mark the notification as sent
      notification.status = "sent";
      await notification.save();
  
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

export async function createNotification(targetedUsers, type, message, scheduleTime) {
    const newNotification = new Notification({
        targetedUsers,
        type,
        message,
        scheduleTime,
    });

    try {
        const savedNotification = await newNotification.save();
        return savedNotification;
    } catch (error) {
        throw new Error('Error creating notification: ' + error.message);
    }

};

export async function getNotification(id){
    try {
        const notification = await Notification.findById(id);
        return notification;
    } catch (error) {
        throw new Error('Error fetching notification: ' + error.message);
    }
};

export async function getUserNotifications(userId){
    try {
        const notifications = await Notification.find({targetedUsers: userId });
        return notifications;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};

export async function deleteNotification(id){
    try {
        const result = await Notification.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error('Error deleting notification: ' + error.message);
    }
};

export async function markAsSent(id){
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { status: 'sent' },
            { new: true }
        );
        return updatedNotification;
    } catch (error) {
        throw new Error('Error marking notification as sent: ' + error.message);
    }
};

export async function markAsRead(id){
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { status: 'read' },
            { new: true }
        );
        return updatedNotification;
    } catch (error) {
        throw new Error('Error marking notification as read: ' + error.message);
    }
};

export async function registerDevice(userId, deviceToken, deviceType){
    const newDevice = new Device({
        userId,
        deviceToken,
        deviceType,
    });

    try {
        const savedDevice = await newDevice.save();
        return savedDevice;
    } catch (error) {
        throw new Error('Error registering device: ' + error.message);
    }
};

export async function getDevice(userId) {
    try {
        const device = await Device.find({ userId });
        return device;
    } catch (error) {
        throw new Error('Error fetching device: ' + error.message);
    }
}

/* export async function deleteDevice(id) {
    try {
        const result = await Device.deleteOne({ _id: id });
        return result.deletedCount > 0;
    } catch (error) {
        throw new Error('Error deleting device: ' + error.message);
    }
} */