# Cyderes Interview Project

This project is a simple application where users can input an IP address or domain, and the system will respond with DNS lookup or WHOIS details.

## Prerequisites

- **Node.js**: v22.x
- **Docker**: v20.x
- **Docker Compose**: v2.x

## Project Structure
```
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── server.test.js
│   │   ├── server.ts
│   │   ├── types.ts
│   │   └── utils
│   │       └── basic.ts
│   └── tsconfig.json
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── cyderes.svg
│   │   │   └── react.svg
│   │   ├── component
│   │   │   ├── Button
│   │   │   │   └── index.tsx
│   │   │   └── InputBox
│   │   │       └── index.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── types
│   │   │   └── data.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
```


## Installation

### Using Docker Compose

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Build and start the containers**:
    ```sh
    docker-compose up --build
    ```

3. **Access the application**:
    - Backend: `http://localhost:5000`
    - Frontend: `http://localhost:5173`

### Running Locally

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies for backend**:
    ```sh
    cd backend
    npm install
    ```

3. **Install dependencies for frontend**:
    ```sh
    cd ../frontend
    npm install
    ```

4. **Start the backend server**:
    ```sh
    cd ../backend
    npm run dev
    ```

5. **Start the frontend server**:
    ```sh
    cd ../frontend
    npm run dev
    ```

6. **Access the application**:
    - Backend: `http://localhost:5000`
    - Frontend: `http://localhost:5173`

## Application Versions

- **Backend**: 1.0.0
- **Frontend**: 0.0.0

## Environment Variables

- **SERVER_IP**: IP address of the server
- **IPINFO_API_KEY**: API key for IPInfo service

## License

This project is licensed under the ISC License.

