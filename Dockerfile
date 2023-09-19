FROM oven/bun

WORKDIR /dash

COPY bun.lockb .
COPY package.json .

RUN bun install

COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]
