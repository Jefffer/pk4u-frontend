# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
