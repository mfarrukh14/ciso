# Complete Setup Guide

This guide will walk you through setting up the entire TxWebsite platform from scratch.

## Step 1: MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IPs
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `txwebsite` (or your preferred name)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/txwebsite?retryWrites=true&w=majority
```

## Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

4. **Configure .env file**
   Open `.env` and set:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/txwebsite?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-min-32-characters
   JWT_EXPIRE=24h
   JWT_REFRESH_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

   **Important**: Generate secure random strings for JWT secrets:
   ```bash
   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   Server running in development mode on port 3000
   ```

6. **Test backend**
   Open browser: http://localhost:3000/api/health
   Should return: `{"success":true,"message":"API is running",...}`

## Step 3: Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (optional)**
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

4. **Configure .env file (optional)**
   Open `.env` and set:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
   
   If you skip this, it defaults to `http://localhost:3000/api`

5. **Start frontend server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v7.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

6. **Open application**
   Open browser: http://localhost:5173

## Step 4: Test Authentication

1. **Register a new user**
   - Go to http://localhost:5173/auth/register
   - Fill in the form
   - Submit

2. **Login**
   - Go to http://localhost:5173/auth/login
   - Use your credentials
   - You should be redirected to dashboard

3. **Check Dashboard**
   - You should see the dashboard
   - Stats will show 0 trades initially (normal)

## Step 5: Trading Bot Setup (Optional)

1. **Install MetaTrader 5**
   - Download from https://www.metatrader5.com/
   - Install and create demo account

2. **Navigate to bot directory**
   ```bash
   cd Hedging
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure bot**
   - Edit `config.py`
   - Set your MT5 credentials:
     ```python
     LOGIN = "your_mt5_login"
     PASSWORD = "your_mt5_password"
     SERVER = "your_broker_server"
     ```

5. **Run bot**
   ```bash
   python bot.py
   ```

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check your connection string in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check username/password are correct
- Ensure cluster is running

**Port Already in Use**
- Change `PORT` in `.env` to another port (e.g., 3001)
- Update `FRONTEND_URL` accordingly

**JWT Errors**
- Ensure JWT secrets are set in `.env`
- Secrets should be at least 32 characters

### Frontend Issues

**API Connection Error**
- Verify backend is running on port 3000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console for CORS errors
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL

**Build Errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (should be 18+)

### MongoDB Atlas Issues

**Connection Timeout**
- Check network access IP whitelist
- Verify connection string format
- Check if cluster is paused (free tier pauses after inactivity)

**Authentication Failed**
- Verify database user credentials
- Check user has proper permissions

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure proper CORS origins
4. Use environment-specific MongoDB cluster
5. Set up SSL/TLS

### Frontend
1. Build: `npm run build`
2. Serve from `dist/` directory
3. Configure API base URL for production
4. Set up reverse proxy (nginx)

### MongoDB Atlas
1. Use production cluster (not free tier)
2. Configure proper IP whitelist
3. Set up database backups
4. Enable monitoring and alerts

## Next Steps

- [ ] Set up email service for password reset
- [ ] Add rate limiting to API
- [ ] Implement API documentation (Swagger)
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline
- [ ] Configure logging and monitoring
- [ ] Add error tracking (Sentry)

## Support

If you encounter issues:
1. Check error messages in console/logs
2. Verify all environment variables are set
3. Ensure all services are running
4. Check MongoDB Atlas dashboard for connection issues

