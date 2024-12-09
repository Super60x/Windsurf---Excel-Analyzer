# Learning from Development

## Routing and Deployment Issues

### Problem
During deployment, the application faced issues with serving static files due to an incorrect directory configuration. The server was initially set to serve files from a `build` directory that did not exist.

### Solution
- **Updated Vite Configuration**: Changed the output directory in `vite.config.ts` to `dist`.
- **Server Configuration**: Modified `server.js` to serve static files from the `dist` directory.

**Example Code**:
```javascript
app.use(express.static(path.join(__dirname, 'dist')));
```

## Email Sending Issues

### Problem
Emails were not being sent when the application was deployed live, although they worked locally. This was due to CORS issues and incorrect API endpoint configurations.

### Solution
- **CORS Configuration**: Updated the server to allow requests from both local and live URLs.
- **API Endpoint Update**: Changed the fetch URL in `RequestFullAccess.tsx` from `http://localhost:3000/send-email` to the live URL.

**Example Code**:
```javascript
const response = await fetch('https://excelinsight.onrender.com/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## CORS Configuration Challenges

### Problem
CORS errors were encountered when trying to send requests from the live site to the server.

### Solution
- **CORS Middleware**: Configured the CORS middleware to accept requests from the live site.

**Example Code**:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://excelinsight.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

## Port Configuration Challenges

### Problem
Port conflicts and misconfigurations were encountered during local development and deployment. The frontend and backend servers needed specific ports to function correctly, leading to conflicts when processes were not terminated properly.

### Solution
- **Frontend Port**: Configured to use port 5173 for the development server.
- **Backend Port**: Configured to use port 3000 for the Express server.
- **Process Management**: Ensured that any processes using these ports were properly terminated before starting the servers.

**Example Configuration**:
```javascript
// In server.js
app.listen(3000, () => console.log('Server running on port 3000'));
```

This setup ensures that both the frontend and backend can run simultaneously without port conflicts, facilitating a smooth development and deployment process.

This document captures the key challenges faced during the development of the Windsurf Excel Data Analyzer application and the solutions implemented to overcome them. It serves as a learning resource for similar future projects.