# Production image for the portfolio site.
# Build: docker build -t portfolio .
# Run:   docker run --rm -p 3000:3000 portfolio

FROM node:22-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
# HUSKY=0 skips the git hook install, since the image has no .git folder.
RUN HUSKY=0 pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
# Build-time values. NEXT_PUBLIC_* is inlined into the client bundle here.
ARG APP_URL
ARG NEXT_PUBLIC_CONTACT_FORM_URL
ENV APP_URL=$APP_URL \
    NEXT_PUBLIC_CONTACT_FORM_URL=$NEXT_PUBLIC_CONTACT_FORM_URL
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# The OG image and vCard routes read src/assets and public at request time.
# node_modules stays whole because some server packages, such as shiki,
# are dev dependencies that Next loads at runtime instead of bundling.
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
