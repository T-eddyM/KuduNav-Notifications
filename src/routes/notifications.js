import express from "express";

const router = express.Router();

let notifications = [];

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

export default router;