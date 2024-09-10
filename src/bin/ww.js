import app from '../config/index.js'

const server = app



const PORT = process.env.NODE_ENV || 3000
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });