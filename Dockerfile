
 

# Stage 1: Build API 

FROM node:18.12 as build1 

WORKDIR /app 
COPY ./apps/api/package.json . 
RUN npm install -g pnpm 
COPY ./apps/api . 
RUN pnpm install 

RUN pnpm run build 


# Stage 2: Build Web 
FROM node:18.12 as build2 
WORKDIR /app 
COPY ./apps/web/package.json . 
RUN npm install -g pnpm 
COPY ./apps/web . 
RUN pnpm install 
CMD ["pnpm", "dev"] 
# Stage 3: Serve Application 
FROM node:18.12 as build3 

WORKDIR /app2 

COPY --from=build1 /app/node_modules /app2/node_modules 

COPY --from=build1 /app/dist /app2/dist 

COPY --from=build1 /app/package.json /app2/package.json 

CMD [ "node", "/app2/dist/index.js" ] 

 

 
