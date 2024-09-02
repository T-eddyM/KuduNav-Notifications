import express, { json } from "express";

const app = express();

const PORT = process.env.PORT || 80;

app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

export default app;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});