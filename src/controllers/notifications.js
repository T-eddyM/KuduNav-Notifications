import axios from "axios";
import dotenv from "dotenv";

import Notification from "../collections/Notification.js";
import Device from "../collections/Device.js";

dotenv.config();

const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;

export async function sendPushNotification(deviceToken, newNotification) {
    try {
        await axios.post('https://fcm.googleapis.com/fcm/send', {
            to: deviceToken,
            notification: {
                title: newNotification.title,
                body: newNotification.message,
            },
        }, {
            headers: {
                'Authorization': `key=${FCM_SERVER_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending notification:', error);
        return { success: false, error: error.message };
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

export async function getNotifications(){
    try {
        const notifications = await Notification.find();
        return notifications;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
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

export async function updateNotification(id){

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

export async function deleteDevice(id){
    try {
        const result = await Device.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error('Error deleting notification: ' + error.message);
    }
};