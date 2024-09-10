import express from "express";

const router = express.Router();

let notifications = [];
let users = [
    {userId: "user1", deviceToken: null, deviceType: null}
];

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
router.delete("/notifications/:id", (req, res) => {
    const { id } = req.params;

    const index = notifications.findIndex(notification => notification.id == id);

    if (index != -1){
        notifications.splice(index, 1);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }

});

//mark a notification as sent
router.post("/notifications/:id/sent", (req, res) => {
    const { id } = req.params;

    const index = notifications.findIndex(notification => notification.id == id);

    if (index != -1){
        notifications[index].status = "sent";
        res.status(200).json(notifications[index]);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
});

//mark a notification as read
router.post("/notifications/:id/read", (req, res) => {
    const { id } = req.params;

    const index = notifications.findIndex(notification => notification.id == id);

    if (index != -1){
        notifications[index].status = "read";
        res.status(200).json(notifications[index]);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
});

//register device for push notifications
router.post("/users/:userId/device", (req, res) => {
    const { userId } = req.params;
    const { deviceToken, deviceType} = req.body;

    const index = users.findIndex(user => user.userId == userId);

    if (index != -1){
        users[index] = {...users[index], deviceToken, deviceType};
        res.status(200).json({message: "Device registered successfully"});
    } else {
        res.status(404).json({message: "User not found"});
    }
});


export default router;