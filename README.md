# WaziNetwork

An online marketplace connecting freelancers with job posters; built as a Bachelor's capstone project at Riara University (2019).

## What It Does

WaziNetwork is a web platform with two types of users:

- **Employers** can post tasks/jobs they need done, review incoming bids, and accept a freelancer to carry out the work.
- **Freelancers** can browse available tasks, submit bids, and connect directly with employers.

The platform focuses on accessibility — no vetting or shortlisting processes — so that students and early-career individuals can quickly find opportunities to earn using skills they already have.

## Features

- User registration and authentication (via PassportJS)
- Task creation, browsing, and bidding
- Real-time user tracking with Socket.IO
- Email notifications via SendGrid
- Image/file asset management via Cloudinary
- Admin dashboard with user management, task oversight, and error logging

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (via MongoDB Atlas) |
| ODM | Mongoose |
| Auth | PassportJS |
| Real-time | Socket.IO |
| Asset Storage | Cloudinary |
| Email | SendGrid (via Nodemailer) |
| Hosting | Heroku |

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern, keeping data logic, presentation, and request handling cleanly separated.

## Project Status

This project was completed and submitted in September 2019 as a final year undergraduate project. The repository is archived and no longer actively maintained.
