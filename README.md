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

## Let's start 🏃

### ⬇️ Clone the repo

```bash
git clone https://github.com/alfaarghya/oms.git

# or

git clone git@github.com:alfaarghya/oms.git

```

### 🛠️ Install Dependencies

```bash
cd oms
yarn install
```

### 🔒 fill all of the `.env` files

- go to all `apps` and `packages`
- if `.env.example` is available, make a copy of `.env.example` as `.env` and fill up data.

### 🐳 Run psql in docker

```bash
docker pull postgres        #need to run once to install postgres image
docker run -e POSTGRES_PASSWORD=omsadminpassward -p 5432:5432 -d postgres
```

### 🔒 Fill up the `.env` file in the `package/db`

```bash
DATABASE_URL="postgresql://postgres:omsadminpassward@localhost:5432/omsDB?schema=public"
```

### 🔗 Connect the db with prisma

```bash
yarn run db:migrate         #migrate to psql db
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
cd ../..             #Now come back to the root dir
yarn run db:generate #need to run once
yarn run dev
```

`if database is not connected properly, server application may crash!` in that can try to reach out [@alfaarghya](https://www.github.com/alfaarghya) [@SouZe-San](https://github.com/SouZe-San)

## Look into your db with prisma 👀

```bash
yarn run db:show  #go to the localhost:5555 on browser
```

## Some useful docker command </>

### 📦 GO inside the running docker container

```bash
docker ps #check the running container & find out our postgress container id
docker exec -it <container_id> psql -U postgres #now you are inside the psql db
```

### ⛃ psql commands inside docker container

```bash
\l                         # to see all the database
\c omsDB                   # go to your database
\dt                        # check the tables

# now you can run basic sql commands like this -
SELECT * FROM "User";      # always put table name inside ""

exit                       # to exit from db run this
```

### 🔪 Kill the running container

after finishing all work always check if your docker container is running or not. If it’s running stop that.

```bash
docker ps #check the running container & find out the container id
docker kill <container_id> # this will stop your container
```

## Run apps separately 🏃

```bash
cd apps/<app_name>
yarn install
yarn run dev
```

## Let's understand Project Structure 🧬

```
oms
|- apps/
|   |- admin/
|   |   |- src/
|   |   |- package.json
|   |   |- tsconfig.json
|   |   |- .env.example
|   |- user/
|   |   |- src/
|   |   |- package.json
|   |   |- tsconfig.json
|   |   |- .env.example
|   |- server/
|       |- src/
|       |- package.json
|       |- tsconfig.json
|       |- .env.example
|
|- packages/
|   |- db/
|   |  |- package.json
|   |  |- tsconfig.json
|   |  |- .env.example
|   |- ui/
|   |  |- package.json
|   |  |- tsconfig.json
|   |- eslint-config/
|   |- typescript-config/
|- package.json
|- turbo.json

```

### 🤓 basics

- every `apps` can run separately
- `packages` does not run because it contain some common files or dependencies that are required to run our `apps`.
- in every `apps` we are going to work on `src/`
- in `apps` or `packages` if we see a `.env.example` file we must create a .env file

### 🧐 Need to know

- let's checkout `packages/<package_name>/package.json`

  - to use the resources in our `apps` from the `packages`, we must `exports` the resources first.
  - for example: inside `ui/package.json` we may see this -
    ```json
      "name": "@oms/ui",
      "version": "0.0.0",
      "private": true,
      "exports": {
      "./button": "./src/button.tsx",
      "./card": "./src/card.tsx",
      "./code": "./src/code.tsx"
      },
    ```

- let's checkout `apps/<app_name>/package.json`
  - to use the packages in our `admin` or `user` app, we have to add those resources in our `package.json` as `dependencies`
    ```json
      "name": "admin",
      "version": "0.1.0",
      "type": "module",
      "private": true,
      "dependencies": {
        "@oms/ui": "*",
      },
    ```
  - Now we can use this `ui component` in our apps
- Like the `ui` package & `admin` app, we can see similar things `db` package & `server` app, Try to explore more!

### 🎓 Advance

- in root, `package.json` we have all of the script and dependencies to run the monorepo
- in every dir we have `package.json`, try to read it for better understanding
- in `typescript-config` package we have typescript config for all of our packages and apps. We just need to import this in every `tsconfig.json`
- in packages, we may add:

  - `types` package for our typescript types
  - `store` package for state management components
  - etc.

## 📌 Important things to Do before `git commit` & `git push` ⚠️

1. always `git pull --rebase` before start working And before committing the changes.
2. run `yarn run check-types` to check typescript type.
3. run `yarn run lint` to check linting, if gives warning or error fix that.
4. If there are no errors, now you can commit and push the code.
