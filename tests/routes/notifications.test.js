import request from 'supertest';
import app from '../../src/config/index.js';
import db from '../../src/config/database.js';
import mongoose from 'mongoose';

describe('Notifications API', () => {
  let notificationId; 
  let deviceId;
  let server;

  beforeAll(async () => {
    await db();
    server = app.listen(3000);
  });

  afterAll(async () => {
    console.log('Closing server and database connections...');
    await server.close();
    await mongoose.disconnect();
  });

  // Test Create Notification
  it('should create a new notification', async () => {
    const response = await request(server) // Use server instance
      .post('/create/notification')
      .send({
        targetedUsers: ['user1'],
        message: 'Bus departure in 30 minutes',
        type: 'bus_departure',
        scheduleTime: new Date().toISOString()
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.targetedUsers).toStrictEqual(['user1']);
    expect(response.body.message).toBe('Bus departure in 30 minutes');
    expect(response.body.type).toBe('bus_departure');
    expect(response.body.status).toBe('scheduled');
    notificationId = response.body._id;
  });

  // Test Get a Notification
  it('should retrieve a specific notification by ID', async () => {
    const response = await request(server) // Use server instance
      .get(`/notifications/${notificationId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBe(notificationId);
    expect(response.body.message).toBe('Bus departure in 30 minutes');
  });

  // Test Get Notifications for a User
  it('should retrieve all notifications for a specific user', async () => {
    const response = await request(server) // Use server instance
      .get(`/notifications/user/user1`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test Mark Notification as Sent
  it('should mark a notification as sent', async () => {
    const response = await request(server) // Use server instance
      .post(`/notifications/${notificationId}/sent`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('sent');
  });

  // Test Mark Notification as Read
  it('should mark a notification as read', async () => {
    const response = await request(server) // Use server instance
      .post(`/notifications/${notificationId}/read`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('read');
  });

  // Test Delete a Notification
  it('should delete a specific notification by ID', async () => {
    await request(server) // Use server instance
      .delete(`/notifications/${notificationId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the notification was deleted
    await request(server) // Use server instance
      .get(`/notifications/${notificationId}`)
      .expect(404);
  });

  // Test Register Device for Push Notifications
  it('should register a device for push notifications', async () => {
    const response = await request(server) // Use server instance
      .post('/users/register/device')
      .send({
        userId: "user1",
        deviceToken: 'device123',
        deviceType: 'iOS'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe('Device registered successfully');
    deviceId = response.body._id;
  });

  // Test Get a Device
  it('should retrieve a specific device by userId', async () => {
    const response = await request(server) // Use server instance
      .get("/users/device/user1")
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //Test delete device
  /* it('should delete a specific device by ID', async () => {
    const deleteResponse = await request(server) // Use server instance
      .delete(`/users/remove/device/${deviceId}`)
      .expect('Content-Type', /json/);

    // Log the response to help with debugging
    console.log('Delete response:', deleteResponse.body);

    // Check if the delete response message is correct
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Device deleted successfully');

    // Check if the device was deleted
    await request(server) // Use server instance
      .get(`/users/remove/device/${deviceId}`)
      .expect('Content-Type', /json/)
      .expect(404);
  }); */

});
