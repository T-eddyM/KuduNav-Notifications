import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { createNotification, getUserNotifications, getNotification, deleteNotification, markAsRead, markAsSent, registerDevice, getDevice } from "../controllers/notifications.js";
import authService from "../authentication/middleware.js";
import { schedule } from "node-cron";

const filename = 'notifications.js';
const dirname = path.resolve(); // Gets the current working directory
const __filename = path.join(dirname, filename);

const router = express.Router();

//documentation
router.get("/docs", (req, res) => {
    res.sendFile(path.join(__filename, "../src/pages/index.html"));
  });

//webhook for receiving alerts
router.post("/notification/alert", authService,  async (req, res) => {
    const { message, type } = req.body;

    if (message && type ) {

        const scheduleTime = Date.now();
        scheduleTime.setMinutes(scheduleTime.getMinutes() + 1);

        const newNotification = await createNotification(targetedUsers, type, message, scheduleTime);
    
        if (newNotification){
            res.status(201).json(newNotification);
        } else{
            res.status(404).json({message: "Failed creating notification"});
        }
    } else {
        res.status(400).json({message: "At least one attribute missing"});
    }

});

//create a notification
router.post("/create/notification", /* authService, */ async (req, res) => {
    const { targetedUsers, message, type, scheduleTime } = req.body;

    if (targetedUsers && message && type && scheduleTime) {
        const newNotification = await createNotification(targetedUsers, type, message, scheduleTime);
    
        if (newNotification){
            res.status(201).json(newNotification);
        } else{
            res.status(404).json({message: "Failed creating notification"});
        }
    } else {
        res.status(400).json({message: "At least one attribute missing"});
    }

});

//get a notification by id
router.get("/notifications/:id", /* authService, */ async (req, res) => {
    const { id } = req.params;

    if (id){
        const notification = await getNotification(id);
    
        if (notification){
            res.status(200).json(notification);
        } else {
            res.status(404).json({message: "Error fetching notification"});
        }
    } else {
        res.status(400).json({message: "id missing"});
    }
});

//get all notifications for a specific user
router.get("/notifications/user/:userId", async (req, res) => {
    const { userId } = req.params;

    if (userId){
        const userNotifications = await getUserNotifications();
    
        if (userNotifications){
            res.status(200).json(userNotifications);
        } else {
            res.status(404).json({message: "Error fetching notifications"});
        }
    } else {
        res.status(400).json({message: "userId missing"});
    }
});

//delete a notification by id
router.delete("/notifications/:id", /* authService, */ async (req, res) => {
    const { id } = req.params;

    if (id) {
        const result = await deleteNotification(id);
    
        if (result){
            res.status(200).json({ message: 'Notification deleted successfully' });
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } else {
        res.status(400).json({message: "id missing"});
    }

});

//mark a notification as sent
router.post("/notifications/:id/sent", /* authService, */ async (req, res) => {
    const { id } = req.params;

    if (id) {
        const updatedNotification = await markAsSent(id);
    
        if (updatedNotification){
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } else {
        res.status(400).json({message: "id missing"});
    }

});

//mark a notification as read
router.post("/notifications/:id/read", /* authService, */ async (req, res) => {
    const { id } = req.params;

    if (id) {
        const updatedNotification = await markAsRead(id);
    
        if (updatedNotification){
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } else {
        res.status(400).json({message: "id missing"});
    }

});

//register device for push notifications
router.post("/users/register/device", /* authService, */ async (req, res) => {
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

//get device for user
router.get("/users/device/:userId", /* authService, */ async (req, res) => {
    const { userId } = req.params;

    if (userId){
        const device = await getDevice(userId);
    
        if (device) {
            res.status(200).json(device);
        } else {
            res.status(404).json({message: "Error fetching device"})
        }
    } else {
        res.status(400).json({message: "userId missing"});
    }

});

//delete a device by id
/* router.delete("/users/remove/device/:id", /* authService,  async (req, res) => {
    const { id } = req.params;

    if (id) {
        const result = await deleteDevice(id);
    
        if (result){
            res.status(200).json({ message: 'Device deleted successfully' });
        } else {
            res.status(404).json({ message: 'Device not found' });
        }
    } else {
        res.status(400).json({message: "id missing"});
    }
}); */



export default router;