import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { createNotification, getUserNotifications, getNotification, deleteNotification, markAsRead, markAsSent, registerDevice, getDevice, deleteDevice } from "../controllers/notifications.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/docs", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/index.html"));
  });

//create a notification
router.post("/create/notification", async (req, res) => {
    const { userId, message, type, scheduleTime } = req.body;

    if (userId && message && type && scheduleTime) {
        const newNotification = await createNotification(userId, type, message, scheduleTime);
    
        if (newNotification){
            res.status(201).json(newNotification);
        } else{
            res.status(404).json({message: "Failed creating notification"});
        }
    } else {
        res.status(404).json({message: "At least one attribute missing"});
    }

});

//get a notification by id
router.get("/notifications/:id", async (req, res) => {
    const { id } = req.params;
    const notification = await getNotification(id);

    if (notification){
        res.status(200).json(notification);
    } else {
        res.status(404).json({message: "Error fetching notification"});
    }
});

//get all notifications for a specific user
router.get("/notifications/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const userNotifications = await getUserNotifications(userId);

    if (userNotifications){
        res.status(200).json(userNotifications);
    } else {
        res.status(404).json({message: "Error fetching notifications"});
    }
});

//update a specific notification
router.post("/notifications/:id", (req, res) => {
    const { message, type, scheduleTime } = req.body;
    const { id } = req.params;

    const index = notifications.findIndex(notification => notification.id == id);

    if (index != -1) {
        notifications[index] = {...notifications[index], message, type, scheduleTime};
        res.status(200).json(notifications[index]);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }

});

//delete a notification by id
router.delete("/notifications/:id", async (req, res) => {
    const { id } = req.params;

    const result = await deleteNotification(id);

    if (result){
        res.status(200).json({ message: 'Notification deleted successfully' });
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }

});

//mark a notification as sent
router.post("/notifications/:id/sent", async (req, res) => {
    const { id } = req.params;

    const updatedNotification = await markAsSent(id);

    if (updatedNotification){
        res.status(200).json(updatedNotification);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
});

//mark a notification as read
router.post("/notifications/:id/read", async (req, res) => {
    const { id } = req.params;

    const updatedNotification = await markAsRead(id);

    if (updatedNotification){
        res.status(200).json(updatedNotification);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
});

//register device for push notifications
router.post("/users/register/device", async (req, res) => {
    const { userId, deviceToken, deviceType} = req.body;

    if (userId && deviceToken && deviceType){
        const savedDevice = await registerDevice(userId, deviceToken, deviceType);
        if (savedDevice){
            res.status(200).json({message: "Device registered successfully"});
        } else {
            res.status(404).json({message: "Error registering device"});
        }
    } else {
        res.status(404).json({message: "At least one attribute missing"});
    }
});

//register device for push notifications
router.get("/users/device/:userId", async (req, res) => {
    const { userId } = req.params;

    const device = await getDevice(userId);

    if (device) {
        res.status(200).json(device);
    } else {
        res.status(404).json({message: "Error fetching device"})
    }
});

//delete a notification by id
router.delete("/users/remove/device/:id", async (req, res) => {
    const { id } = req.params;

    const result = await deleteDevice(id);

    if (result){
        res.status(200).json({ message: 'Device deleted successfully' });
    } else {
        res.status(404).json({ message: 'Device not found' });
    }

});



export default router;