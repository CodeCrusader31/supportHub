# SupportHub - Modern Support Ticket System

SupportHub is a premium, full-stack web application designed for support teams and merchants to efficiently create, manage, and resolve customer support inquiries. 

The application features a modern glassmorphism aesthetic, real-time analytics, paginated data loading, and advanced sorting capabilities.

## 🚀 Key Features

- **Interactive Dashboard**: Get a high-level overview of support metrics (Total, Active, and Resolved tickets) alongside a quick view of recent inquiries.
- **Ticket List & Data Management**: A dedicated ticket viewing page featuring backend pagination for performance at scale.
- **Advanced Sorting Capabilities**: 
  - Sort by **Recency** (Newest/Oldest).
  - Sort by **Severity/Priority** (High to Low, or Low to High), backed by a robust customized MongoDB aggregation pipeline.
- **Ticket Creation & Updates**: An intuitive form to submit new tickets with assigned priority levels, along with dedicated detail views to manage their lifecycle statuses (`NEW`, `INVESTIGATING`, `RESOLVED`).
- **Premium UI/UX**: Built with Tailwind CSS, the application boasts dynamic animations, a responsive glassmorphism design, and color-coded status badges for immediate visual feedback.

## 💻 Tech Stack

- **Frontend**: 
  - React 19 (Vite)
  - React Router DOM v7 (Client-side routing)
  - Tailwind CSS v4 (Styling)
  - Lucide React (Icons)
  - Axios (Data Fetching)
- **Backend**: 
  - Node.js & Express.js (REST API)
  - MongoDB & Mongoose (Database & ODM)
  - CORS & dotenv (Environment Management)

## 🏗️ Architecture

### Frontend Architecture
- **Component-Driven**: The UI is modularized (`Sidebar`, `TicketCard`, `TicketTable`), making the codebase DRY and highly maintainable.
- **State Management**: Utilizes React's native `useState` and `useEffect` paired with Axios for asynchronous data fetching. 
- **Routing**: `react-router-dom` delivers a seamless Single Page Application (SPA) experience.

### Backend Architecture (MVC Pattern)
- **Routes (`/routes`)**: Define the API endpoints (e.g., `/api/tickets`) and route them to corresponding controllers.
- **Controllers (`/controllers`)**: Parse incoming HTTP requests, extract payloads/query parameters, and send HTTP responses.
- **Services (`/services`)**: Contain isolated, core business logic and direct database queries (like parsing pagination and executing complex `$switch` pipelines for accurate priority sorting). This decoupled approach makes the backend robust and easily scalable.
- **Models (`/models`)**: Mongoose schemas enforcing strict validation on MongoDB records.

## ⚙️ How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running MongoDB instance (Local or Atlas)

### 1. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 2. Start the Backend
```bash
cd backend
npm install
node index.js
```
*The backend API will be available at `http://localhost:5000`*
*(Note: Use `npm run start` or `node index.js`. Since nodemon isn't configured by default, manual restarts are needed if you actively edit backend files).*

### 3. Start the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The React app will be available at `http://localhost:5173`*

## 📚 API Endpoints

### Ticket Data Model
- `subject` (String, Required)
- `message` (String, Required)
- `priority` (Enum: `Low`, `Medium`, `High`)
- `status` (Enum: `NEW`, `INVESTIGATING`, `RESOLVED`) - Defaults to `NEW`
- `createdBy` (String) - Defaults to `Anonymous`

### Endpoints
| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `POST` | `/api/tickets` | Create a new ticket | - |
| `GET`  | `/api/tickets` | Get all tickets | `page`, `limit`, `sortBy` (createdAt/priority), `order` (asc/desc) |
| `PATCH`| `/api/tickets/:id` | Update ticket status | Payload: `{ status: 'RESOLVED' }` |

*(Note: If `page` and `limit` are not provided to the GET endpoint, it safely falls back to returning all non-paginated tickets to support global system metrics on the dashboard).*
