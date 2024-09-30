import cron from 'node-cron';
import axios from 'axios';
import { createNotification } from '../controllers/notifications.js';

// Define the cron job
const scheduleBusNotifications = () => {
    cron.schedule('*/10 * * * *', async () => { // Runs every 10 minutes
        try {
            // Make the request to the external API
            const response = await axios.get('https://api.example.com/bus-schedules');
            const subscriptions = response.data;

            for (const subscription of subscriptions) {
                const { userId, busDepartureTime } = subscription;

                const notificationTime = new Date(busDepartureTime);
                notificationTime.setMinutes(notificationTime.getMinutes() - 10); // Set notification for 10 minutes before departure

                // Check if it's time to create the notification
                const now = new Date();
                if (now >= notificationTime && now < new Date(busDepartureTime)) {
                    await createNotification(userId, 'Bus Notification', 'Bus leaves in 10 minutes');
                    console.log(`Notification sent to user ${userId}: Bus leaves in 10 minutes`);
                }
            }
        } catch (error) {
            console.error('Error fetching bus schedules or creating notifications:', error.message);
        }
    });
};

export default scheduleBusNotifications;
