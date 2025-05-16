# Real Time Chat 🍪

[![API Image](https://github.com/lucasmaurice/websocket-tester/actions/workflows/package-build-api.yml/badge.svg)](https://github.com/lucasmaurice/websocket-tester/actions/workflows/package-build-api.yml)
[![Client Image](https://github.com/lucasmaurice/websocket-tester/actions/workflows/package-build-client.yml/badge.svg)](https://github.com/lucasmaurice/websocket-tester/actions/workflows/package-build-client.yml)

> Note: This project is a fork from https://github.com/Chrischuck/websocket-docker-example without the Postges part.

It is to be used as a websocket tester, to validate Reverse-Proxy or Indress configuration.

This uses Docker to build/run the client and api on two seperate images. Clients are paired in chat together sequentially; i.e. client 0 and client 1, client 2 and client 3, and so forth. 

## UI
<p align="center">
  <img  src='https://github.com/lucasmaurice/websocket-tester/blob/main/images/1.png' height='480' width='300'>
  <img src='https://github.com/lucasmaurice/websocket-tester/blob/main/images/2.png' height='480' width='300'>
</p>

## Goals of this repo
- [x] Learn Docker
- [x] Practice using websockets with a real time chat
- [x] Implement postgresql

## Installation/Running
Clone the repo:  
```bash
git clone https://github.com/lucasmaurice/websocket-tester.git
```
Enter the directory:  
```bash
cd websocket-tester
```

Build Docker images:  
```bash
docker-compose build
```

Run Docker images:  
```bash
docker-compose up
```
Now open up your favorite web browser and navigate to `localhost:5008'. Each new window will be a new client.