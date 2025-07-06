# 🅿️ PK4U: Parking for You - Frontend
**PK4U** is an open-source web application designed for the intelligent management of parking spaces in urban environments. The goal is to centralize information on parking availability onto a single platform, allowing citizens to quickly and efficiently locate parking lots with available spaces, thereby improving mobility within a Smart City context.

## 🚀 Getting Started

To run the frontend application locally, follow these steps.

### 📋 Prerequisites

Make sure you have the following installed on your system before proceeding:

* **Node.js**: Version `v18` or higher. You can download it from [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager): Automatically included with Node.js installation.

### 1. Clone the Repository ⬇️

First, clone this repository to your local machine using Git and navigate to the project directory:

```bash
git clone https://github.com/Jefffer/pk4u-frontend.git
cd pk4u-frontend
```

### 2. Install Dependencies
Once inside the project directory, install all the necessary dependencies.

With npm:

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### 3. Environment Setup
The application needs to connect to the backend's API Gateway, which acts as the single entry point for the entire system. By default, it expects the gateway to be running at `http://localhost:8080`.

If your API Gateway is running on a different port or address, you can create a .env file in the project root and specify the base URL:


---
## 🌟 What is PK4U?

PK4U is an open-source web application that allows real-time visualization of parking spot availability in various urban establishments. Its objective is to centralize this information on a single accessible platform for citizens, thus improving urban mobility in the context of a Smart City.

### 💻 Main Components of PK4U:

The PK4U system consists of several parts, working together to offer a comprehensive parking management solution:

* **Frontend (This Repository)**: The intuitive and reactive user interface developed with **React.js** that allows citizens to view parking lots on an interactive map and check their real-time availability.
    * **Frontend Repository**: [https://github.com/Jefffer/pk4u-frontend](https://github.com/Jefffer/pk4u-frontend)
* **Backend**: The robust server built with **Java** and **Spring Boot** that handles business logic, processes occupancy data updates (simulated by these scripts), and serves information to the Frontend via a RESTful API.
    * **Backend Repository**: [https://github.com/MMunozLo/PK4U-backend.git](https://github.com/MMunozLo/PK4U-backend.git)
* **DB Scripts**: This tool is crucial for initializing and maintaining the database, inserting the spot structure and generating detailed spot information for each floor.
* **Simulator**
* **API Gateway**
* **Eureka**

### 🤝 Contribution
Your help is welcome! If you wish to contribute to this script project, please feel free to:

* Open an **Issue** to report a problem or propose an improvement.
* Open a **Pull Request** with your changes and contributions.

### 📄 License
This project is distributed under an Open Source license, encouraging collaboration and transparency in the development of solutions for Smart Cities.
