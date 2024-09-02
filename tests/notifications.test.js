import request from 'supertest';
import app from "../index";

describe('Notifications API', () => {
  let notificationId; 

  // Test Create Notification
  it('should create a new notification', async () => {
    const response = await request(app)
      .post('/notifications')
      .send({
        userId: 'user1',
        message: 'Bus departure in 30 minutes',
        type: 'bus_departure',
        scheduleTime: new Date().toISOString()
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe('user1');
    expect(response.body.message).toBe('Bus departure in 30 minutes');
    expect(response.body.type).toBe('bus_departure');
    expect(response.body.status).toBe('scheduled');
    notificationId = response.body.id;
  });

  // Test Get a Notification
  it('should retrieve a specific notification by ID', async () => {
    const response = await request(app)
      .get(`/notifications/${notificationId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(notificationId);
    expect(response.body.message).toBe('Bus departure in 30 minutes');
  });

  // Test Get Notifications for a User
  it('should retrieve all notifications for a specific user', async () => {
    const response = await request(app)
      .get(`/notifications/user/user1`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test Update a Notification
  it('should update an existing notification by ID', async () => {
    const response = await request(app)
      .post(`/notifications/${notificationId}`)
      .send({
        message: 'Bus departure in 10 minutes',
        type: 'bus_departure',
        scheduleTime: new Date().toISOString()
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(notificationId);
    expect(response.body.message).toBe('Bus departure in 10 minutes');
  });

  // Test Delete a Notification
  it('should delete a specific notification by ID', async () => {
    await request(app)
      .delete(`/notifications/${notificationId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the notification was deleted
    await request(app)
      .get(`/notifications/${notificationId}`)
      .expect(404);
  });

  // Test Mark Notification as Sent
  it('should mark a notification as sent', async () => {
    const response = await request(app)
      .post(`/notifications/${notificationId}/sent`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('sent');
  });

  // Test Mark Notification as Read
  it('should mark a notification as read', async () => {
    const response = await request(app)
      .post(`/notifications/${notificationId}/read`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('read');
  });
});
