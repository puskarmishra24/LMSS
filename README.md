# Learning Management System (LMS) Project

This repository contains the source code and implementation of a Learning Management System (LMS) developed using the MERN stack (MongoDB, Express.js, React, Node.js) along with Tailwind CSS and DaisyUI for styling.


## Overview

The Learning Management System (LMS) is a web-based application that facilitates the management and delivery of educational content and training materials. It allows administrators to create courses, manage users, and track progress. Users can access courses, view content, and complete assessments.

## Preview

You can preview the project at [Preview Link](https://lms-by-sukomal.vercel.app).

## Features

- User authentication and authorization
- Course creation, modification, and deletion
- Content upload and management using Cloudinary
- User enrollment in courses
- Course progress tracking
- Interactive user interface using React and Tailwind CSS

## Prerequisites

Before running this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)
- [Cloudinary](https://cloudinary.com/) account and API credentials

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Sukomal07/learning-management-system.git
   cd learning-management-system
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the `server` directory and add the following:
   ```plaintext
   PORT=5000
   MONGO_URI=<your_mongoDB_URI>
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=<set_JWT_secret>
    JWT_EXPIRE=<set_JWT_EXP>
   CLOUD_NAME=<your_cloudinary_name>
   API_KEY=<your_cloudinary_api_key>
   API_SECRET=<your_cloudinary_api_secret>
   GMAIL_ID=<mail_id_for_sending_mail>
   APP_PASSWORD=<set_app_password_in_gmail>

## Usage

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

2. Start the client:

   ```bash
   cd client
   npm run dev
   ```

3. Access the application at [http://localhost:5173](http://localhost:5173)

