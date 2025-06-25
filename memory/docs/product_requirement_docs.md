# Product Requirement Document (PRD) for Schedulo

## 1. Introduction
*   **Project Name:** Schedulo
*   **Document Version:** 1.0
*   **Date:** 20.06.2025
*   **Author(s):** Dumitru Alina, Stănculescu Mihai
*   **Purpose:** This project aims to build a smart productivity assistant in the form of a mobile application that helps users manage their day with minimal effort by learning from their routines and behavior. The assistant intelligently adapts to the user’s habits, suggests tasks, reschedules conflicting events, and prioritizes what’s most important — all powered by AI.

## 2. Goals
*   **Business Goals:** To create a powerful competitive advantage through a deeply personalized experience, driving user conversion to a future premium tier. This supports the strategic objective of increasing user retention and daily engagement.
*   **User Goals:** To transform the user’s relationship with time management from reactive anxiety to proactive control, giving them confidence that their schedule is always optimized and reducing cognitive load.
*   **Technical Goals:** To develop a foundational, scalable, and privacy-first data science capability that serves as the ethical bedrock for leveraging user data to create value.

## 3. Background and Rationale
*   **Problem:** Modern users are overloaded managing tasks across multiple, non-adaptive platforms (calendars, to-do lists). These tools don't learn, handle unexpected changes, or help with prioritization, leading to cognitive overload, wasted time, and stress. There is a need for an intelligent, proactive system that automates daily planning.
*   **Market Analysis:** The target market consists of tech-savvy individuals who are time-poor and struggle with managing a complex mix of professional, personal, and academic commitments. They are looking for solutions that go beyond simple task listing and offer intelligent assistance.
*   **Competitive Analysis:** While many task management and calendar apps exist, few offer proactive, AI-driven rescheduling and habit-learning capabilities. Schedulo's differentiator will be its ability to act as a personalized productivity coach that automates planning friction.

## 4. Scope
*   **In Scope (V1 - P0 Features):**
    *   Welcome screen and user authentication (Email/Password & Google).
    *   Password reset functionality.
    *   Guided onboarding for calendar connection and notification permissions.
    *   A "Today" view combining calendar events and tasks.
    *   Manual task creation with a title and due date.
    *   Task capture from other apps via the native "Share" function.
    *   Ability to mark tasks as complete and high-priority.
    *   Automatic conflict resolution for flexible tasks.
    *   Basic push notifications for due tasks.
    *   Account management (view connected accounts, log out).
*   **Out of Scope:**
    *   Customizable visual themes and application skins.
    *   Social media sharing capabilities.
    *   Exporting tasks in uncommon formats (e.g., XML, JSON).
    *   Notifications related to weather or other external information.

## 5. Target Audience
*   **Primary Persona: "Alex the Overextended Professional"** - A 30-year-old consultant juggling multiple projects and personal goals. They are tech-savvy but time-poor, needing an intelligent system to anticipate needs and manage cognitive overload.
*   **Secondary Persona: "Sam the Student Procrastinator"** - A 20-year-old university student with a chaotic, unstructured schedule. They need an intelligent coach to provide structure, build momentum, and balance work with rest.

## 6. Requirements
### 6.1. Functional Requirements
*   **Authentication:**
    *   Users must be able to sign up using email/password or Google OAuth.
    *   Users must be able to log in with their chosen method.
    *   The system must provide a "Forgot Password" flow that sends a reset link to the user's email.
*   **Onboarding:**
    *   The system must guide new users to connect their primary calendar (e.g., Google Calendar).
    *   The system must request permission to send push notifications, explaining their purpose.
*   **Task Management:**
    *   The system must display a "Today" view with a chronological list of calendar events and tasks.
    *   Users must be able to add a task with at least a title.
    *   Users must be able to add a due date to a task.
    *   Users must be able to mark a task as "High Priority," which makes it visually distinct and sorts it to the top.
    *   Users must be able to mark a task as complete via a checkbox.
*   **Integration & AI:**
    *   The app must register as a "Share" target to capture text from other apps for task creation.
    *   The system must detect when a new calendar event conflicts with a scheduled task and suggest a new time for the task.
*   **Notifications:**
    *   The system must send a daily push notification for tasks due on the current day.
*   **Settings:**
    *   Users must be able to view and disconnect connected accounts.
    *   Users must be able to log out of their account.

### 6.2. Non-Functional Requirements
*   **Performance:** Data synchronization across devices must complete within 1 second.
*   **Security:** All user data must be encrypted in transit (TLS) and at rest. The system must adhere to GDPR.
*   **Accessibility:** The UI must comply with WCAG 2.1 AA standards.
*   **Localization:** UI strings must be designed for easy translation into multiple languages.
*   **Technology Stack:**
    *   **Backend:** Supabase
    *   **Frontend:** React Native
    *   **UI Components:** Shadcn

## 7. Release Criteria
*   **Definition of Done:** The V1 release is considered complete when all P0 user stories listed in the scope are implemented, tested, and meet their defined acceptance criteria.
*   **Acceptance Testing:** Each functional requirement will be manually tested against its user story's acceptance criteria on both iOS and Android target devices. Automated unit and integration tests will be implemented for core logic (e.g., conflict resolution, authentication).

## 8. Success Metrics
*(Note: These metrics are for tracking post-launch and will be refined.)*
*   **Adoption Rate:** % of target users who use the app >2 times in their first week. **Target: 40%**
*   **Task Completion Rate:** % of users who successfully create and complete a task. **Target: 95%**
*   **Retention Impact:** 3-month retention rate of users who adopt the app vs. a baseline. **Target: +5% lift**
*   **Support Tickets:** Reduction in support tickets related to scheduling and task management. **Target: -10%**

## 9. Risks and Challenges
*   **Risk:** Technical performance impact of refreshing data for users with a very high number of events.
    *   **Mitigation:** Conduct load testing during the development phase and optimize data synchronization queries. Implement intelligent local caching.
*   **Risk:** The assumption that users prefer an automated suggestion for conflict resolution rather than manual control may be incorrect.
    *   **Mitigation:** Validate this assumption during beta testing. Be prepared to add a setting to disable automatic suggestions if feedback indicates a need.
*   **Risk:** Ensuring data privacy and security compliance with a new AI-driven feature set.
    *   **Mitigation:** Conduct a thorough security review and privacy impact assessment. Ensure all data used for AI modeling is anonymized and handled according to GDPR principles.

## 10. Open Issues
*   What is the precise logic for selecting the "best" new time slot during conflict resolution? (Needs definition by the product/dev team).
*   Do we need to support sharing with specific people, or is a public link sufficient for V1? (Needs discussion with security/users).

## 11. Future Considerations
*   Customizable columns/views in the dashboard.
*   Export to CSV/PDF.
*   Conditional formatting (e.g., turn a project red if it's overdue).
*   More advanced AI features, such as time estimation for tasks and productivity pattern analysis.

## 12. Glossary
*   **AI:** Artificial Intelligence.
*   **GDPR:** General Data Protection Regulation.
*   **PRD:** Product Requirement Document.
*   **WCAG:** Web Content Accessibility Guidelines.