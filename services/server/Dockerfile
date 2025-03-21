FROM python:3.12-slim AS build

RUN apt-get update && \
    apt-get install -y libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt && \
    pip install --no-cache-dir gunicorn

WORKDIR /app

COPY .env.prod .env

COPY . .

RUN rm -rf .env.prod

FROM python:3.12-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq5 && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /app /app

WORKDIR /app

RUN prisma generate --schema=libs/database/schema.prisma

ENV FLASK_ENV=production

ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
