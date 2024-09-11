# Blockhouse
# Dashboard Application

This project is a web application built using Next.js on the frontend and integrated with a Django API backend. The application features a dashboard page with multiple types of charts (Line Chart, Bar Chart, Pie Chart) that fetch and display data from the Django API. The Candlestick Chart is currently a placeholder.

## README for Django and Next.js Application

---

### **Table of Contents**
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setting Up the Django Backend](#setting-up-the-django-backend)
    - Prerequisites
    - Installation
    - Running the Django Server
4. [Setting Up the Next.js Frontend](#setting-up-the-nextjs-frontend)
    - Prerequisites
    - Installation
    - Running the Next.js Application
5. [Libraries and Tools Used](#libraries-and-tools-used)
6. [API Endpoints](#api-endpoints)
7. [Thought Process and Approach](#thought-process-and-approach)

---

## Introduction

This project is a full-stack application built using **Django** for the backend and **Next.js** for the frontend. The backend serves several REST API endpoints that provide chart data (e.g., candlestick, line, bar, and pie charts). The Next.js frontend consumes these APIs to render visualizations using React-Chart.js and React Financial Charts.

---

## Project Structure

```
/backend               # Django Backend
    └── api            # Django app serving chart data via REST API
    └── manage.py      # Django management script
    └── db.sqlite3     # SQLite database (can be ignored)
    
/frontend              # Next.js Frontend
    └── components     # React components for rendering charts
    └── pages          # Next.js pages (dashboard)
    └── public         # Static assets
    └── styles         # Global CSS styles
    └── package.json   # Frontend package dependencies
```

---

## Setting Up the Django Backend

### Prerequisites

- Python 3.x
- Django 4.x+
- Django Rest Framework

### Installation

1. Clone the repository and navigate to the backend directory:

    ```bash
    git clone https://github.com/your-repo.git
    cd backend
    ```

2. Install dependencies:

    ```bash
    pip install django djangorestframework
    ```

3. Apply migrations and start the server:

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

   The backend will be accessible at `http://localhost:8000/`.

### Running the Django Server

After installing dependencies, run the Django development server:

```bash
python manage.py runserver
```

You should be able to see the default Django homepage by visiting `http://localhost:8000/`.

---

## Setting Up the Next.js Frontend

### Prerequisites

- Node.js (v14.x+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the Next.js development server:

    ```bash
    npm run dev
    ```

   The frontend will be available at `http://localhost:3000/`.

---

## Libraries and Tools Used

### **Backend (Django)**
- **Django**: Web framework used for serving the backend API.
- **Django REST Framework**: For building API endpoints.

### **Frontend (Next.js)**
- **Next.js**: Framework for server-side rendering and React-based web applications.
- **Axios**: HTTP client for fetching data from the Django backend.
- **Chart.js**: For rendering the line, bar, and pie charts.
- **React-ChartJS-2**: React wrapper for Chart.js.
- **React-Financial-Charts**: For rendering candlestick charts.

---

## API Endpoints

The Django backend exposes several REST API endpoints that provide chart data:

1. **Candlestick Chart Data**:  
   **URL**: `/api/candlestick-data/`  
   **Method**: `GET`  
   **Response**:
    ```json
    {
      "data": [
        {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
        {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
      ]
    }
    ```

2. **Line Chart Data**:  
   **URL**: `/api/line-chart-data/`  
   **Method**: `GET`  
   **Response**:
    ```json
    {
      "labels": ["Jan", "Feb", "Mar", "Apr"],
      "data": [10, 20, 30, 40]
    }
    ```

3. **Bar Chart Data**:  
   **URL**: `/api/bar-chart-data/`  
   **Method**: `GET`  
   **Response**:
    ```json
    {
      "labels": ["Product A", "Product B", "Product C"],
      "data": [100, 150, 200]
    }
    ```

4. **Pie Chart Data**:  
   **URL**: `/api/pie-chart-data/`  
   **Method**: `GET`  
   **Response**:
    ```json
    {
      "labels": ["Red", "Blue", "Yellow"],
      "data": [300, 50, 100]
    }
    ```

---

## Thought Process and Approach

The project is split into two parts: Django for the backend and Next.js for the frontend. This separation of concerns ensures that the backend handles data storage and retrieval, while the frontend focuses on the user interface and rendering charts.
   - **React-Financial-Charts** was chosen for the candlestick chart due to its specialized financial charting capabilities.
   - **React-ChartJS-2** was used for the line, bar, and pie charts due to its simplicity and integration with Chart.js, a powerful charting library.

---

## Future Improvements

1. **Authentication**: Add user authentication to restrict access to the data.
2. **Styling**: Improve the visual appearance of the dashboard with custom styling and a better user experience.
