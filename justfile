set dotenv-load

BACKEND := "server"
PORT := "3000"

up *FLAGS:
    @docker compose up -d {{FLAGS}}

re *FLAGS:
    docker compose down && docker compose up -d {{FLAGS}}

down:
    @docker compose down

build SERVICE *FLAGS:
    docker compose build {{SERVICE}} {{FLAGS}}

logs SERVICE:
    @docker compose logs {{SERVICE}} -f

exec +COMMAND:
    docker compose exec {{BACKEND}} {{COMMAND}}

shell SERVICE SHELL='bash':
    @docker compose exec -it {{SERVICE}} {{SHELL}}

fetch URL *FLAGS:
    @-httpx http://localhost:{{PORT}}/api/{{URL}} --auth $API_USERNAME $API_PASSWORD {{FLAGS}}

prisma +COMMAND:
    @docker compose exec {{BACKEND}} yarn prisma {{COMMAND}}

migrate:
    @docker compose exec {{BACKEND}} yarn prisma migrate dev

db:
    @docker compose exec -it database mysql -u root -p

populate:
    @docker compose exec -it database sh -c 'zcat ./unifox-scripts/*.sql.gz | mysql -u root -p main'
    @echo "=> Database populated with dev data!"
