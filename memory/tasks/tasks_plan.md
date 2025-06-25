# Task Backlog and Project Progress Tracker for Schedulo (with Subtasks)

## Backlog:

### Backend & Infrastructure Setup
    - [x] **Setup Supabase Project**
        - [x] Create a new project in the Supabase dashboard.
        - [x] Configure project settings (e.g., name, region).
        - [x] Store API keys and project URL securely as environment variables.
    - [x] **Define Database Schema**
        - [x] Write SQL migration script for the `users` table.
        - [x] Write SQL migration script for the `tasks` table (with columns for title, due_date, completed, priority, user_id).
        - [x] Write SQL migration script for `connected_accounts`.
        - [x] Apply migrations to the Supabase database. [x]
        - [x] Enable Row-Level Security (RLS) on all tables and define policies.
    - [x] **Develop AI Service (Conflict Resolution V1)**
        - [x] Set up a new serverless function endpoint (e.g., in Supabase or Vercel).
        - [x] Implement the basic algorithm to find an open time slot in a given schedule.
        - [x] Add authentication to the endpoint to secure it.

### Authentication (US-01, US-02, US-03, US-04)
    - [x] **US-01: Create Welcome Screen**
        - [x] Design the layout for the welcome screen with logo, tagline, and benefits.
        - [x] Implement the UI using React Native and Shadcn components.
        - [x] Add navigation handlers for "Sign Up" and "Log In" buttons.
    - [x] **US-02: Implement User Sign-Up**
        - [x] Create the "Sign Up" screen with email and password form fields.
        - [x] Add client-side validation for the form fields.
        - [x] Integrate with `supabase.auth.signUp()`.
        - [x] Implement the "Sign up with Google" button using `supabase.auth.signInWithOAuth()`.
        - [x] Add a required checkbox for Terms of Service & Privacy Policy.
    - [ ] **US-03: Implement User Login**
        - [ ] Create the "Log In" screen.
        - [ ] Integrate with `supabase.auth.signInWithPassword()`.
        - [ ] Implement the "Log in with Google" button.
        - [ ] On successful login, navigate the user to the "Today" view.
    - [ ] **US-04: Implement Password Reset**
        - [ ] Create the "Forgot Password" screen.
        - [ ] Add a link to this screen from the login page.
        - [ ] Integrate with `supabase.auth.resetPasswordForEmail()`.

### Onboarding (US-05)
    - [ ] **US-05: Build Guided Onboarding Flow**
        - [ ] Create a multi-step onboarding component shown after the first login.
        - [ ] Implement the "Connect Calendar" step (initially Google Calendar).
        - [ ] Implement the "Enable Notifications" step, requesting system permissions.
        - [ ] Show a success message and navigate to the "Today" view upon completion.

### Core App - Task & Schedule Management (US-06 to US-13)
    - [ ] **US-06: Develop "Today" View**
        - [ ] Create the main layout for the "Today" screen.
        - [ ] Fetch and display calendar events from the connected account.
        - [ ] Fetch and display tasks from the Supabase database.
        - [ ] Combine and sort events and tasks in a chronological list.
    - [ ] **US-07: Implement Manual Task Creation**
        - [ ] Create a floating action button or similar UI element to trigger task creation.
        - [ ] Build the "Add Task" modal/form with a title input field.
        - [ ] Implement the logic to save the new task to the database.
    - [ ] **US-08: Implement Task Capture via "Share"**
        - [ ] Configure the React Native app to be a share target in iOS and Android.
        - [ ] Implement the handler to receive shared text and pre-fill the "Add Task" form.
    - [ ] **US-09: Implement Mark Task as Complete**
        - [ ] Add an interactive checkbox to each task item in the list.
        - [ ] Implement the `onPress` handler to update the task's `completed` status in the database.
        - [ ] Apply a visual style (e.g., strikethrough) to completed tasks.
    - [ ] **US-10: Add Due Date to Tasks**
        - [ ] Add a "Due Date" field to the "Add/Edit Task" form.
        - [ ] Integrate a native date picker component.
        - [ ] Display the selected due date on the task item in the "Today" view.
    - [ ] **US-11: Add High-Priority Flag to Tasks**
        - [ ] Add a priority toggle (e.g., a star icon) to the "Add/Edit Task" form.
        - [ ] Update the task list to display a visual indicator for high-priority tasks.
        - [ ] Modify the database query to sort high-priority tasks to the top.
    - [ ] **US-12: Implement Automatic Conflict Resolution**
        - [ ] Create a Supabase Function that is triggered when a new calendar event is added.
        - [ ] The function should check for overlapping tasks.
        - [ ] If a conflict is found, call the AI service to get a suggested new time.
        - [ ] Show a prompt to the user in the app to approve the suggested change.
    - [ ] **Setup Push Notification Service**
        - [ ] Configure Firebase Cloud Messaging (FCM) for Android and Apple Push Notification service (APNs) for iOS.
        - [ ] Securely store server keys.
    - [ ] **US-13: Implement Basic Push Notifications**
        - [ ] Create a Supabase Function that runs on a schedule (e.g., daily).
        - [ ] The function will query for tasks due "today" and send notifications to the respective users via the push notification service.
        - [ ] Configure the client app to handle incoming notifications.

### Settings & Account Management (US-14, US-15)
    - [ ] **US-14: Create "Connected Accounts" Screen**
        - [ ] Build the UI for the "Settings" area.
        - [ ] Create the "Connected Accounts" section that lists active integrations.
        - [ ] Implement the "Disconnect" functionality for each integration.
    - [ ] **US-15: Implement Logout Functionality**
        - [ ] Add a "Log Out" button in the "Settings" area.
        - [ ] Implement the call to `supabase.auth.signOut()`.
        - [ ] On successful logout, clear local state and navigate to the Welcome Screen.

## Current Status:
*   **Planning Phase Complete:** The Product Requirement Document (PRD), Architecture Document, and Technical Specifications have been created. The initial task backlog has been defined and broken down into subtasks. The project is now ready to move into the development phase.

## Known Issues:
*   A definitive choice for the frontend state management library (Zustand vs. Redux Toolkit) is still pending.
*   A detailed plan for adapting Shadcn's web components for React Native needs to be formulated.
*   The specific algorithm for the AI conflict resolution service needs to be designed and documented.