FROM node:20-slim AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_MSAL_CLIENT_ID
ARG VITE_MSAL_AUTHORITY
ARG VITE_MSAL_REDIRECT_URI
ARG VITE_API_SCOPE

COPY package*.json ./
RUN npm ci

COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public

RUN npm run build


FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
