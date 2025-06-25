# Architecture Document for Schedulo

## 1. Introduction
*   **Project Name:** Schedulo
*   **Document Version:** 1.0
*   **Date:** 20.06.2025
*   **Author(s):** Dumitru Alina, Stănculescu Mihai
*   **Purpose:** This document outlines the architecture for the Schedulo application, a smart productivity assistant. It details the system's components, data flow, technology stack, and deployment strategy, ensuring alignment with the project's goals.

## 2. Goals
*   **Architectural Goals:**
    *   **Scalability:** The architecture must support a growing user base and increasing data load without degradation in performance.
    *   **Security:** Protecting user data is paramount. The architecture will enforce strict security measures for data in transit and at rest.
    *   **Maintainability:** The system will be built with a modular, clean architecture to facilitate easy updates and maintenance.
    *   **Performance:** The application must be responsive, with data synchronization completing in under one second.
*   **Business Goals:** The architecture directly supports the business goals of high user retention and engagement by enabling a reliable, fast, and secure user experience.

## 3. System Overview
*   **System Context Diagram:**
    ```mermaid
    graph TD
        User[User] -- Interacts with --> MobileApp[React Native Mobile App]
        MobileApp -- API Calls --> Backend[Supabase Backend]
        Backend -- Manages --> DB[PostgreSQL Database]
        Backend -- Handles --> Auth[Supabase Auth]
        Backend -- Triggers --> AI[AI/ML Service for Scheduling]
        MobileApp -- Receives Push Notifications --> PushService[Push Notification Service]
        Backend -- Sends jobs to --> PushService
        User -- Authenticates via --> Google[Google OAuth]
        Google -- Interacts with --> Auth
    ```
*   **Component Diagram:**
    ```mermaid
    rectangle "Schedulo System" {
      rectangle "React Native Frontend" as Frontend {
        component "UI Components (Shadcn)" as UI
        component "State Management" as State
        component "API Client" as API
        component "Push Notification Handler" as PushHandler
      }

      rectangle "Supabase Backend" as Backend {
        component "RESTful API (PostgREST)" as API_Backend
        component "Authentication" as Auth_Backend
        component "Database (PostgreSQL)" as DB_Backend
        component "Serverless Functions" as Functions
        component "Storage" as Storage_Backend
      }
      
      rectangle "AI Service" as AIService {
          component "Conflict Resolution Engine" as CRE
          component "Habit Learning Module" as HLM
      }

      UI --> State
      State --> API
      API --> API_Backend
      API_Backend --> DB_Backend
      API_Backend --> Functions
      Functions --> DB_Backend
      Functions -- Triggers --> AIService
      Auth_Backend -- Manages users in --> DB_Backend
      Frontend -- Uses --> Auth_Backend
      PushHandler -- Listens to --> PushNotificationService[External: Push Notification Service]
      Functions -- Sends notifications via --> PushNotificationService
    }
    ```
*   **Deployment Diagram:**
    ```mermaid
    graph TD
        subgraph "User Device"
            MobileApp[React Native App]
        end

        subgraph "Cloud (Supabase)"
            Supabase_Project[Supabase Project]
            Supabase_Project -- Contains --> API_Server[API Server (PostgREST)]
            Supabase_Project -- Contains --> Auth_Service[Auth Service]
            Supabase_Project -- Contains --> DB_Instance[PostgreSQL Database]
            Supabase_Project -- Contains --> Functions_Runtime[Serverless Functions]
            Supabase_Project -- Contains --> Storage_Service[File Storage]
        end
        
        subgraph "Cloud (Vercel/Netlify - for AI Service, optional)"
            AIService_Deployment[AI Service Deployment]
        end

        MobileApp -- HTTPS --> API_Server
        MobileApp -- HTTPS --> Auth_Service
        API_Server -- Interacts with --> DB_Instance
        Functions_Runtime -- Interacts with --> DB_Instance
        Functions_Runtime -- HTTPS --> AIService_Deployment
    ```

## 4. Components
### 4.1. React Native Mobile App (Frontend)
*   **Description:** The user-facing application for iOS and Android.
*   **Responsibilities:** Rendering the UI, managing user interactions, handling application state, communicating with the backend API.
*   **Interfaces:** User Interface, Push Notification Handler.
*   **Dependencies:** Supabase Backend.
*   **Implementation Details:** Built with React Native. UI components will be from Shadcn. State management will likely use a library like Zustand or Redux Toolkit.

### 4.2. Supabase (Backend)
*   **Description:** The backend-as-a-service platform providing the database, authentication, and serverless functions.
*   **Responsibilities:**
    *   **Authentication:** Managing user sign-up, login, and password resets via email and Google OAuth.
    *   **Database:** Storing all user data, including tasks, events, and user profiles.
    *   **API:** Providing a secure RESTful API for the frontend to interact with the database.
    *   **Serverless Functions:** Hosting business logic that shouldn't live on the client, such as triggering AI services or sending push notifications.
*   **Interfaces:** RESTful API, Authentication endpoints.
*   **Dependencies:** None (it is the core backend).

### 4.3. AI Service
*   **Description:** A separate service responsible for intelligent features.
*   **Responsibilities:**
    *   **Conflict Resolution:** Analyzing schedules and suggesting new times for tasks when conflicts arise.
    *   **Habit Learning:** (Future) Analyzing user behavior to provide proactive suggestions.
*   **Interfaces:** A simple, secure HTTP endpoint that receives schedule data and returns suggestions.
*   **Dependencies:** Supabase Backend (for data).
*   **Implementation Details:** Can be a set of serverless functions or a small, containerized service. Python with libraries like Pandas and scikit-learn would be a good choice.

## 5. Data Architecture
*   **Data Model:** A relational model will be used in PostgreSQL.
    *   `users`: Stores user profile information.
    *   `tasks`: Stores user tasks with fields for title, due_date, completed, priority, etc.
    *   `calendar_events`: Stores a cached version of events from connected calendars.
    *   `connected_accounts`: Manages OAuth tokens for connected services like Google Calendar.
*   **Data Storage:** All data will be stored in the Supabase PostgreSQL database.
*   **Data Flow:**
    1.  The user interacts with the React Native app.
    2.  The app sends API requests to the Supabase backend.
    3.  Supabase processes the request, interacts with the PostgreSQL database, and returns a response.
    4.  For AI-driven features, a Supabase Function is triggered, which calls the external AI service with the necessary data.
    5.  The AI service processes the data and returns a result to the Function, which then updates the database.

## 6. Security
*   **Security Requirements:**
    *   All communication between the client and backend must be over HTTPS.
    *   User passwords must be hashed.
    *   Row-Level Security (RLS) in Supabase will be enabled to ensure users can only access their own data.
    *   Sensitive data like OAuth tokens will be encrypted at rest.
*   **Security Measures:**
    *   Use of Supabase's built-in authentication and RLS.
    *   Secure handling of API keys and secrets using environment variables.
    *   Regular security audits of the codebase and dependencies.

## 7. Scalability
*   **Scalability Requirements:** The system must handle a large number of concurrent users without performance degradation.
*   **Scalability Strategy:**
    *   Supabase is designed to be scalable. We can scale the database and serverless functions as needed.
    *   The AI service will be deployed as a stateless, serverless function or in a container, allowing it to scale horizontally.

## 8. Performance
*   **Performance Requirements:** Data sync under 1 second.
*   **Performance Optimization:**
    *   Efficient database queries and indexing.
    *   Caching of frequently accessed data on the client.
    *   Optimistic UI updates to give the user immediate feedback.

## 9. Technology Stack
*   **Frontend:** React Native
*   **UI Components:** Shadcn
*   **Backend:** Supabase (PostgreSQL, PostgREST, Auth, Serverless Functions)
*   **AI Service:** Python (or Node.js) deployed as a serverless function.

## 10. Deployment
*   **Frontend:** Deployed to the Apple App Store and Google Play Store via their respective CLI tools and CI/CD pipelines (e.g., GitHub Actions).
*   **Backend:** Deployment is handled by Supabase. We will manage schema migrations using Supabase's migration tools.
*   **AI Service:** Deployed to a serverless platform like Vercel, Netlify, or AWS Lambda.

## 11. Monitoring
*   **Supabase:** Use Supabase's built-in logging and monitoring for the backend.
*   **Frontend:** Integrate an error tracking service like Sentry or Bugsnag to monitor for client-side errors.
*   **AI Service:** Use the monitoring tools provided by the deployment platform (e.g., Vercel Analytics, AWS CloudWatch).

## 12. Open Issues
*   Final decision on the state management library for the React Native app.
*   Detailed implementation plan for the AI service's conflict resolution algorithm.

## 13. Future Considerations
*   Integration with other calendar providers (e.g., Outlook).
*   Development of a web-based version of the application.
*   More advanced AI features like task time estimation and proactive scheduling.

## 14. Glossary
*   **RLS:** Row-Level Security.
*   **CI/CD:** Continuous Integration/Continuous Deployment.