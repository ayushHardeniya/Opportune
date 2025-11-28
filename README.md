# Opportune - Find Your Dream Job

Opportune is a modern, responsive job portal application designed to connect job seekers with employers. It provides a seamless experience for browsing job listings, managing applications, and posting new opportunities.

## 🚀 Features

### For Job Seekers
- **Browse Jobs**: View a list of available job opportunities with detailed descriptions.
- **Advanced Search & Filters**: Search by keywords and filter jobs by location (e.g., Remote, New York, London) and job type (Full-time, Part-time, Contract, etc.).
- **Apply for Jobs**: Easy one-click application process for logged-in users.
- **Track Applications**: View the status of all your submitted applications in a dedicated dashboard.
- **Profile Management**: View your profile details and activity statistics.

### For Employers
- **Post Jobs**: Create detailed job listings with requirements, salary range, and experience levels.
- **Manage Listings**: View and delete your posted jobs.
- **View Applications**: See who has applied to your job postings.
- **Company Profile**: Manage your company's presence on the platform.

### General Features
- **User Authentication**: Role-based login system for Job Seekers and Employers.
- **Real-time Notifications**: Instant alerts for new jobs, application updates, and successful actions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Data Persistence**: All data (jobs, applications, user profiles) is saved locally in your browser, so you don't lose progress upon refresh.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox/Grid, Font Awesome for icons
- **Storage**: Browser LocalStorage (No backend server required)

## 🏁 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).

### Installation
1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd Opportune
    ```

### Running the Application
Simply open the `index.html` file in your web browser.
- **Windows**: Double-click `index.html` or right-click and select "Open with" -> Google Chrome.
- **Mac/Linux**: 
    ```bash
    open index.html
    # or
    xdg-open index.html
    ```

## 📖 Usage Guide

### 1. Login
- Upon opening the app, you will be prompted to log in.
- **Username**: Enter any username (e.g., `john_doe`).
- **Role**: Select either **Job Seeker** or **Employer**.
- *Note: Since this is a demo app using LocalStorage, no password is required.*

### 2. Job Seeker Workflow
- **Search**: Use the search bar to find jobs by title, company, or skills.
- **Filter**: Use the dropdowns to filter by Location or Job Type.
- **Apply**: Click "Apply Now" on any job card. You can view your applied jobs in the "My Applications" tab.

### 3. Employer Workflow
- **Post a Job**: Click "Post Job" in the navigation bar. Fill in the details (Title, Company, Salary, etc.) and click "Post Job".
- **Manage**: Go to "Profile" to see your posted jobs and any applications received.

## 📂 Project Structure

```
Opportune/
├── index.html      # Main HTML structure
├── style.css       # Global styles and responsive design
├── script.js       # Application logic, state management, and DOM manipulation
└── README.md       # Project documentation
```

## 🎨 Design
The application features a clean, professional interface with:
- **Glassmorphism effects** on modals and cards.
- **Interactive elements** with hover states and transitions.
- **Toast notifications** for user feedback.

---
*Built for the Mini Project - Second Year.*
