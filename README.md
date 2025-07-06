<p align="center">
  <img src="public/logo-transparent.png" alt="PK4U Logo" width="160"/>
</p>

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


### 4. Running the Application
Now, you can start the Vite development server:
```bash
npm run dev
```

The application should be available at http://localhost:5173 (or whichever port Vite indicates in your terminal).

### 5. Running the Full System
Keep in mind that the frontend is only the **presentation layer** of the PK4U system. for full functionality, you need to have all the backend services running.

Make sure to clone and run the following repositories in the recommended order:

| Order | Component             | Description                                                                                          | Repository                                                                    |
| :---: | --------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
|   1   | **Eureka Server** | Essential service for dynamic discovery and registration of all microservices.                       | [eureka_service_tfm](https://github.com/gecamara/eureka_service_tfm)       |
|   2   | **API Gateway** | Single entry point for all requests, routing traffic from the frontend to the appropriate services.  | [gateway_service](https://github.com/gecamara/gateway_service)         |
|   3   | **PK4U Backend** | The core application that centralizes business logic and communicates with the database.             | [PK4U-backend](https://github.com/MMunozLo/PK4U-backend.git)         |
|   4   | **DB Scripts** | Scripts to initialize the MongoDB database with the required data structure.                         | [pk4u-db-scripts](https://github.com/Jefffer/pk4u-db-scripts)           |
|   5   | **Simulator** | Emulates IoT sensor behavior, generating and sending real-time parking occupancy data.               | [Simulator](https://github.com/MMunozLo/Simulator)                   |


---
## 🌟 What is PK4U?

In modern cities, finding parking has become a daily challenge that causes stress and unnecessarily increases traffic and pollution. This phenomenon, known as _cruising for parking_, negatively affects the quality of life and urban sustainability.

**PK4U** was created to address this problem by offering an open-source solution that centralizes and displays real-time parking availability in a city. Our platform unifies data from multiple parking facilities into a single interface with interactive maps, empowering drivers to make better decisions and contributing to smarter, more sustainable mobility.

### 💻 Core Technology Stack

| Área                | Tecnologías Clave                                                              |
| ------------------- | ------------------------------------------------------------------------------ |
| **Frontend** | `React` `Vite` `React Router` `Tailwind CSS` `Leaflet` `i18next`                 |
| **Backend** | `Java` `Spring Boot` `Spring Cloud`                                            |
| **Data & Search**| `MongoDB` `Elasticsearch`                                                      |
| **Communication** | `REST API` `RabbitMQ`                                                          |
| **Architecture** | `Microservicios` `API Gateway` `Service Registry (Eureka)`                     |

### 🤝 Contribution
Your help is welcome! If you wish to contribute to this script project, please feel free to:

* Open an **Issue** to report a problem or propose an improvement.
* Open a **Pull Request** with your changes and contributions.

### 📄 License
This project is distributed under an Open Source license, encouraging collaboration and transparency in the development of solutions for Smart Cities.
