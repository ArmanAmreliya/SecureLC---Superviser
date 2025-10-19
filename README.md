# SecureLC Supervisor - Government Lineman Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Web-blue.svg)](https://secure-lc-superviser.vercel.app/)
[![React Version](https://img.shields.io/badge/react-^18.2.0-brightgreen.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-^5.4.10-purple.svg)](https://vitejs.dev/)

**SecureLC Supervisor** is the central web-based dashboard for the Government of India's Lineman Management System. Designed for supervisors, this platform provides real-time monitoring, management, and auditing of field operations to ensure electrical safety and regulatory compliance.

---

### **LINKS**

- **Live Supervisor Portal:** **[secure-lc-superviser.vercel.app](https://secure-lc-superviser.vercel.app/)**
- **Mobile App Repo:** [github.com/ArmanAmreliya/SecureLC](https://github.com/ArmanAmreliya/SecureLC)
- **Supervisor Web Repo:** [github.com/ArmanAmreliya/SecureLC---Superviser](https://github.com/ArmanAmreliya/SecureLC---Superviser)

---

## 📸 Landing Page

![SecureLC Landing Page](/LandingPage.jpg)
---

## ✨ Core Features

The SecureLC Supervisor portal is a comprehensive tool built to provide a centralized command center for field operations.

* **Real-Time Dashboard:**
    * **Live Statistics:** View at-a-glance summaries of pending, active, and completed line clear requests.
    * **Operational Overview:** Monitor key performance metrics like approval rates, completion rates, and compliance status.
    * **Government-Styled UI:** A professional and clean interface inspired by official government portals for clarity and authority.

* **Request Management:**
    * **Centralized Request Table:** A detailed, filterable, and searchable table of all incoming line clear requests from field linemen.
    * **One-Click Actions:** Supervisors can approve, deny, or mark requests as complete directly from the dashboard.
    * **Detailed Request Modal:** View all information for a specific request, including substation, fault type, notes, and listen to attached audio recordings from the lineman.

* **Live Field Map:**
    * **Real-time Worker Tracking:** Visualize the live GPS locations of all active field workers on an interactive map.
    * **Worker Details Popup:** Click on a worker to see their name, ID, current task, and status.
    * **Multiple Map Views:** Switch between Street, Satellite, and Hybrid map layers for better context.

* **Compliance & Auditing:**
    * **Historical Audit Log:** Access a complete history of all completed and denied requests for compliance and review.
    * **Advanced Filtering:** Filter audit logs by status, date range, or search by substation, fault type, or lineman ID.
    * **Data Export:** Export audit logs to CSV for official reporting and record-keeping.

* **Secure Authentication:**
    * **Supervisor Login:** Secure login portal for authorized supervisors.
    * **Firebase Integration:** Built on Firebase for robust and secure authentication and data management.

---

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack.

* **Frontend:** [React](https://react.dev/) (`v18.2.0`)
* **Build Tool:** [Vite](https://vitejs.dev/) (`v5.4.10`)
* **UI Framework:** [Material-UI (MUI)](https://mui.com/) (`v5.18.0`)
* **Routing:** [React Router DOM](https://reactrouter.com/) (`v6.20.1`)
* **Mapping:** [rlayers](https://rlayers.dev/) & [OpenLayers](https://openlayers.org/)
* **Backend & Database:** [Firebase](https://firebase.google.com/) (`v10.7.1`)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To run this project locally, follow the steps below.

### Prerequisites

* Node.js (v18 or higher recommended)
* A package manager like `pnpm`, `npm`, or `yarn`
* A Firebase project with Authentication and Firestore enabled.

### 1. Clone the Repository

```bash
git clone [https://github.com/ArmanAmreliya/SecureLC---Superviser.git](https://github.com/ArmanAmreliya/SecureLC---Superviser.git)
cd SecureLC---Superviser

