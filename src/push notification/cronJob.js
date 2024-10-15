import cron from 'node-cron';
import Notification from '../collections/Notification.js';
import { sendNotification } from '../controllers/notifications.js';

// Define the cron job
const scheduleBusNotifications = async () => {
    // Define the cron job that runs every minute
    cron.schedule('* * * * *', async () => {
        try {
        console.log('Checking for scheduled notifications...');
    
        const now = new Date();
        
        // Fetch notifications that are due and have not been sent
        const notifications = await Notification.find({
            scheduledTime: { $lte: now },
            status: "scheduled",
        });
    
        // Send each due notification
        for (const notification of notifications) {
            await sendNotification(notification);
        }
        } catch (error) {
        console.error('Error in cron job:', error);
        }
    });
};

export default scheduleBusNotifications;





/*
cron.schedule('10 * * * * ', async () => { // Runs every 10 minutes
        /* try {
            // Make the request to the external API
            const busSchedule = await axios.get('http://ec2-52-40-184-137.us-west-2.compute.amazonaws.com/api/v1/bus-schedule/');
            const subscriptionsResult = await axios.get('http://ec2-52-40-184-137.us-west-2.compute.amazonaws.com/api/v1/bus-schedule/api/subscriptions/listsub');
            const busScheduleData = busSchedule.data;
            const subscriptions = subscriptionsResult.data.data;
            //console.log(subscriptions);

            for (const subscription of subscriptions) {
                const { userID, RouteID } = subscription;
                const route = busScheduleData.find(route => route.routeId == RouteID);
                //console.log(route);

                for (const stop of route.stops) {
                    const notificationTime = new Date(stop.departureTime);
                    //console.log(notificationTime);
                    notificationTime.setMinutes(notificationTime.getMinutes() - 10); // Set notification for 10 minutes before departure
                    //console.log(notificationTime);

                    // Check if it's time to create the notification
                    const now = new Date();
                    //if (now >= notificationTime && now < new Date(stop.departureTime)) {
                        // Create the notification
                        const createdNotification = await createNotification(userID, 'Bus Alert', `Bus leaves ${stop.stopName} in 10 minutes`, notificationTime);

                        console.log(createdNotification);

                        // Schedule a push notification
                        const delay = notificationTime - now; // Time until the notification should be pushed
                        /* setTimeout(() => {
                            pushNotification(userId, 'Bus Notification', 'Bus leaves in 10 minutes');
                            console.log(`Pushed notification to user ${userId}: Bus leaves in 10 minutes`);
                        }, delay); 

                        console.log(`Notification created for user ${userID} to be sent in ${delay} ms`);
                    //}
                }

                /* const notificationTime = new Date(busDepartureTime);
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

*/
