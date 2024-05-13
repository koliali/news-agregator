# News Agregator (React + Vite)

This is a news agregator website in which i have used 3 providers api  GuardiansApi,NewYorkTimes,NewsApi in this project i am using free apis which have a daily quota of 50 to 100 request.

To put your api key first create account in these providers and then create api and put those api-token in .env file.

## Prerequisites
- Docker Desktop or Docker Engine installed on your system

## Instructions to use localy 
1. **Create node_modules  cmd:**  npm install
2. **To run the project cmd:** npm run dev

## Instructions to use 
1. **Building the Docker Image:** using cmd: docker build -t vite-react-app:latest .
2. **Check your image using cmd:** docker images | grep vite-react-app
3. **Now you need to make a container with your image using cmd:** docker run -p 8080:8080 vite-react-app:latest