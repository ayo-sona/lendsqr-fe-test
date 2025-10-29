#  Lendsqr Admin Dashboard Clone

A **React + TypeScript** admin dashboard clone inspired by **Lendsqr**, built to demonstrate real-world frontend engineering concepts such as component reusability, API integration, UI responsiveness, and interactive state-driven features.

---

## Overview

This project replicates the functionality and design of an **Admin Dashboard** system used to manage platform users, review data, and perform key administrative actions.

The goal was to simulate an admin environment where an admin can:
- View and manage users  
- Access detailed user information  
- Filter, search, and paginate through users  
- Block or activate users with feedback notifications  
- Log out securely  

---

## Tech Stack

- **React (Vite + TypeScript)** — frontend framework  
- **React Router DOM** — for page navigation  
- **SCSS Modules** — for component-level styling  
- **Mocki API** — mock backend with 500 sample users  
- **LocalStorage** — for temporary authentication persistence  
- **Toast Notification System** — custom-built user feedback mechanism  

---

## Mock API Integration

To simulate backend functionality without an actual server, I used a **Mocki API** endpoint containing **500 randomly generated user records**.

This allowed the app to behave like a real dashboard with:
- Dynamic data fetching  
- Table rendering and pagination  
- User filtering and search  

Each user record includes:
- Organization  
- Username  
- Email  
- Phone Number  
- Date Joined  
- Status (Active, Inactive, Pending, or Blacklisted)  

---

## 🔍 User Filtering & Search

The **Users page** includes a **filter modal** that allows admins to quickly find users based on:
- Organization  
- Username  
- Email  
- Status  

All filtering and searching logic are performed client-side for instant updates.  
The system mimics server-side filtering behavior for demo purposes.

---

## Block & Activate User

To simulate administrative control, each user row includes options to **Block** or **Activate** the user.

When these actions are performed:
- A **toast message** appears, confirming success or failure  
- Example messages:  
  - ✅ `User successfully activated`  
  - ❌ `User blocked`

This feature doesn’t modify a real backend (since it’s mock data), but it **demonstrates UI state changes and feedback flow**.

---

## 💬 Toast Notification System

A custom **Toast Component** (`Toast.tsx`) was created for feedback notifications.  
It includes:
- Two styles: `toast-success` and `toast-error`
- Slide-in animation from the right  
- Auto-dismiss after 3 seconds  
- Manual close option (“×” button)

Built with SCSS animations for smooth transitions.

### Example:
```tsx
<Toast message="User blocked successfully" type="error" onClose={handleClose} />
