import express from "express";

const router = express.Router();

let notifications = [];

//create a notification
router.post("/notifications", (req, res) => {
    const { userId, message, type, scheduleTime } = req.body;

    const newNotification = {
        id: notifications.length + 1,
        userId,
        message,
        type,
        status: 'scheduled',
        scheduleTime,
        createdAt: new Date().toISOString()
      };

      notifications.push(newNotification);
      res.status(201).json(newNotification);
});

//get a notification by id
router.get("/notifications/:id", (req, res) => {
    const { id } = req.params;
    const notification = notifications.find(notification => notification.id == id);
  
    if (notification) {
        res.status(200).json(notification);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
});

//get all notifications for a specific user
router.get("/notifications/user/:userId", (req, res) => {
    const { userId } = req.params;
    const userNotifications = notifications.filter(notification => notification.userId == userId);

    res.status(200).json(userNotifications);
});

//update a specific notification

export default router;