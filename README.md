<div align='center'>

```
      _           _     
     | |         | |    
   __| | __ _ ___| |__  
  / _` |/ _` / __| '_ \ 
 | (_| | (_| \__ \ | | |
  \__,_|\__,_|___/_| |_|
                        
                           
```

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)

</div>

---

`dash` is a platform desigend to help you manage and review your collection of decks of flashcards locally 🚀. It uses `bun`, `ElysiaJS` + `jsx`, `prisma`, `tailwind CSS` and `HTMX` under the hood to provide a minimalist yet reactive exprerience.

## Prerequisites

- [bun](https://bun.sh)
- [just](https://github.com/casey/just)
- [docker](https://www.docker.com) (and docker-compose!)

## 🧰 Setup

Clone the repository anywhere on your machine
```bash
git clone git@github.com:alexis-moins/dash.git
```

Install the dependencies using bun
```bash
bun install
```

Create a .env file from the .env.local file
```bash
cp .env.local .env
```

Launch the database container
```bash
just up
```

## 🌱 Seeding the database

> First, ensure the database container is running! You should see it when typing `docker ps`

Create the tables used by dash
```bash
bunx prisma db push
```

Seed the database with default data
```bash
bunx prisma db seed
```

## 🚦 Starting your journey

> Until prisma works in a bun docker container, we need to manually start the project aside from launching the database container.

Start the server
```bash
bun run dev
```

Visit dash [here](http://localhost:3030)!
