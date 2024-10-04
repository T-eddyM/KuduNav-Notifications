import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    targetedUsers: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "scheduled",
    },
    scheduleTime: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;