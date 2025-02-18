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

## Let's start

### Clone the repo

```bash
git clone https://github.com/alfaarghya/oms.git

# or

git clone git@github.com:alfaarghya/oms.git

```

### Install Dependencies

```bash
cd oms
yarn install
```

### fill all of the `.env` files

- go to all `apps` and `packages`
- if `.env.example` is available, make a copy of `.env.example` as `.env` and fill up data.

### Run the application

```bash
yarn run db:generate #need to run once
yarn run dev
```

`if database is locally host and connected to our server application, it may crash!`

## Run apps separately

```bash
cd apps/<app_name>
yarn install
yarn run dev
```

## Let's understand Project Structure

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

### basics

- every `apps` can run separately
- `packages` does not run because it contain some common files or dependencies that are required to run our `apps`.
- in every `apps` we are going to work on `src/`
- in `apps` or `packages` if we see a `.env.example` file we must create a .env file

### Need to know

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

### Advance

- in root, `package.json` we have all of the script and dependencies to run the monorepo
- in every dir we have `package.json`, try to read it for better understanding
- in `typescript-config` package we have typescript config for all of our packages and apps. We just need to import this in every `tsconfig.json`
- in packages, we may add:

  - `types` package for our typescript types
  - `store` package for state management components
  - etc.
