# Store24h - User Frontend

User-facing frontend for the Store24h phone activation and SMS verification platform.

The application provides the web interface used by customers to authenticate, browse available services, make purchases and monitor their service activity.

## Features

- User authentication
- Password recovery
- Service listing
- Service purchasing
- Purchase and service activity tracking
- User account management
- Password change
- Token-based authentication
- API key integration
- Backend API integration
- Responsive user interface

## Technologies

- React
- JavaScript
- Vite
- Redux
- Redux Toolkit
- Redux Saga
- Axios
- React Router
- Material UI
- Bootstrap
- Formik
- Firebase
- i18next
- ApexCharts
- Chart.js
- ECharts
- Leaflet

## Application Structure

The application is organized around several main areas:

- Authentication
- Service listing
- Service purchases
- Service activity
- User account management
- API communication
- Application state management
- Reusable UI components

The application uses React Router for navigation and Redux for application state management.

## Authentication

The frontend implements an authentication flow based on backend-issued tokens.

After authentication, the application stores the authenticated user information and token locally and uses the token when communicating with protected backend endpoints.

The application also retrieves and manages an API key associated with the authenticated user.

## Backend Integration

The frontend communicates with backend services through HTTP APIs using Axios.

The main application flows are connected to backend endpoints responsible for:

- User authentication
- User information
- Service catalog
- Service purchases
- Service activity
- Account management

## Getting Started

### Requirements

- Node.js
- npm or Yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/juniorgomes21/site-store24h-front-user-new.git
cd site-store24h-front-user-new
