import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const deviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    userId: {
        type: String,
        required: true,
    },
    deviceToken: {
        type: String,
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    push: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;