FROM python:3.12-slim AS build

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN prisma generate --schema=libs/database/schema.prisma

FROM python:3.12-slim

COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages

COPY --from=build . /app

WORKDIR /app

ENTRYPOINT ["python3", "app.py"]
