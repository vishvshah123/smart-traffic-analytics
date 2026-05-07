# Deployment & GitHub Guide

This document explains how to push your project to GitHub and deploy it for public viewing.

## 1. Pushing to GitHub

I have already initialized a local Git repository and made the first commit. To push it to your GitHub account, follow these steps:

1. **Create a New Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name it `smart-traffic-analytics`.
   - Keep it Public or Private (your choice).
   - **Do not** initialize with README, license, or gitignore.

2. **Link and Push**:
   Open a terminal in the project root and run:
   ```bash
   # Add your GitHub repository as the remote
   git remote add origin https://github.com/YOUR_USERNAME/smart-traffic-analytics.git
   
   # Rename branch to main
   git branch -M main
   
   # Push to GitHub
   git push -u origin main
   ```

---

## 2. Frontend Deployment (Vercel/Netlify)

Since the frontend is built with React + Vite, it is very easy to deploy:

1. **Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **"Add New"** -> **"Project"**.
   - Import your `smart-traffic-analytics` repository.
   - Set the **Root Directory** to `frontend`.
   - Add **Environment Variables**:
     - `VITE_API_URL`: (Your backend URL after deployment, e.g., `https://api-traffic.render.com`)
   - Click **Deploy**.

---

## 3. Backend Deployment (Render/Railway)

1. **Render**:
   - Go to [render.com](https://render.com).
   - Create a **New Web Service**.
   - Connect your GitHub repo.
   - Set **Root Directory** to `backend`.
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - Add **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string.
     - `PORT`: 10000 (Render's default).

---

## 4. Big Data Components (Kafka & Spark)

> [!NOTE]
> For a college project, Kafka and Spark are usually demonstrated **locally** during the viva. 
> To deploy them in the cloud, you would typically use:
> - **Confluent Cloud** (for managed Kafka).
> - **Databricks** or **AWS EMR** (for managed Spark).
> - **MongoDB Atlas** (for the database).

### Recommended Setup for Viva:
1. Run Kafka and Spark locally.
2. Deploy the **Backend** and **Frontend** to the cloud using the steps above.
3. Update the frontend to point to your local machine (using Ngrok) or a cloud-hosted backend.
