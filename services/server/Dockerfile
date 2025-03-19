FROM python:3.12-slim AS build

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /app

COPY .env.prod .env

COPY . .

RUN rm -rf .env.prod

FROM python:3.12-slim

COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /app /app

WORKDIR /app

RUN prisma generate --schema=libs/database/schema.prisma

ENTRYPOINT ["python3", "app.py"]
