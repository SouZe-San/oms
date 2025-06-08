<div align="center">

# OMS

### The Order Management System

![Turborepo](https://img.shields.io/badge/Turborepo-%2320232a.svg?style=for-the-badge&logo=Turborepo&logoColor=%EF4444)
![TypeScript](https://img.shields.io/badge/typetscript-%2320232a.svg?style=for-the-badge&logo=typescript&logoColor=%fff)
![React.js](https://img.shields.io/badge/React.js-%2320232a?style=for-the-badge&logo=react&logoColor=316192)
![Next.js](https://img.shields.io/badge/Next.js-%2320232a?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2320232a?style=for-the-badge&logo=tailwindCSS&logoColor=316192)
![Express.js](https://img.shields.io/badge/express-%2320232a.svg?style=for-the-badge&logo=express&logoColor=%23F7DF1E)
![PostGresSQL](https://img.shields.io/badge/PostgreSQL-%2320232a.svg?style=for-the-badge&logo=postgresql&logoColor=%316192)
![Prisma](https://img.shields.io/badge/Prisma-%2320232a.svg?style=for-the-badge&logo=prisma&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%2320232a?style=for-the-badge&logo=node.js&logoColor=43853D)

 </div>

![oms-architecture](./public/oms-architecture.png)

## Features 🧪

### 🔐 Authentication

- secure user signin/signup with api routes
- successful signin/signup generate auth token that will be store on cookies
- all merchant routes are protected for admin roles only.
- all routes are protected, only register user.

### 👨‍💼 Merchant Dashboard

- add or list new products
- view product details such as name, category, stock, price.
- view orders of each product on product page.
- low stock notification.

### 🛒 Customer site

- view all products & details
- add multiple products in cart & it will sync
- place order with one click
- track order status on order list

## Run the App locally 🏃

### ⬇️ Clone the repo

```bash
git clone https://github.com/alfaarghya/oms.git

# or

git clone git@github.com:alfaarghya/oms.git

```

### 🛠️ Install Dependencies

```bash
cd oms        # go to oms folder
yarn install  # install dependencies
```

### 🔒 fill all of the `.env` files

```bash
#db's env
cd packages/db/
cp .env.example .env
cd ../..

#server's env
cd apps/server/
cp .env.example .env
cd ../..
```

### 🐳 connect the db

```bash
#starting the postgres db with docker
docker run -e POSTGRES_PASSWORD=omsadminpassward -p 5432:5432 -d postgres

#migrate db
yarn run db:migrate

#generate client
yarn run db:generate

#optional - show the actual db
yarn run db:show
```

### 🌱 Seed the db

after running this `yarn run db:migrate` something like this will appear -

```bash
Running seed command `ts-node prisma/seed.ts` ...
Database seeded successfully!

🌱  The seed command has been executed.
```

if, this does not seem to be appear on the terminal, run the below command

```bash
yarn run db:seed
```

### 🏃 Run the application

```bash
yarn run dev
```

## Demos

### 1. Landing Page

![landing-page](./public/oms-landing.png)

### 2. Merchant Dashboard

![merchant-1](./public/oms-admin1.png)
![merchant-1](./public/oms-admin2.png)

### 3. Product Page

![customer-1](./public/oms-customer1.png)
![customer-3](./public/oms-customer3.png)

### 4. Cart Page

![customer-4](./public/oms-customer4.png)

### 5. Order Page

![customer-5](./public/oms-customer5.png)
![customer-6](./public/oms-customer6.png)
