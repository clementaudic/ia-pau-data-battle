# Patent Maestro

## Usage

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

### Environment variables configuration

*Replace <...>s below with the appropriate values.*

Create a `.env.prod` file in the `services/server` directory and add the following environment variables:

```bash
DATABASE_URL=postgresql://<username>:<password>@database:5432/<database_name>
OLLAMA_API_URL=http://ollama:11434
SECRET_KEY=<a_random_string>
```

Create a `.env.prod` file in the `services/ui` directory and add the following environment variables:

```bash
API_URL=http://server:5000
NEXT_PUBLIC_API_EXTERNAL_URL=http://localhost:5000
```

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
DATABASE_NAME=<database_name(e.g. patent_maestro)>   # The same as in the DATABASE_URL in the server .env file
DATABASE_USER=<username>                             # The same as in the DATABASE_URL in the server .env file
DATABASE_PASSWORD=<password>                         # The same as in the DATABASE_URL in the server .env file
API_URL=http://server:5000                           # The same as in the UI .env file
NEXT_PUBLIC_API_EXTERNAL_URL=http://localhost:5000   # The same as in the UI .env file
```

>
> **Note:** The previous instructions are for development purposes.
> For production, after the Data Battle, the environment variables should be set in a more secure way.
>

### Running the application

To start the application, run the following command in the root directory of the project:

```bash
docker compose up
```

To stop the application, run the following command in the root directory of the project:

```bash
docker compose down
```

### Accessing the application

The application can be accessed at the following URLs:

- Frontend client: [http://localhost:3000](http://localhost:3000)
- Backend server: [http://localhost:5000](http://localhost:5000)

## Project Structure

```
docs/                     # Project presentation slides
    Patent_Maestro.pdf
    Patent_Maestro.pptx
services/
    server/               # Backend server
        data/
            raw/          # Raw data
            cleaned/      # Cleaned data
        Dockerfile
        ...               # Other backend server files
    ui/                   # Frontend client
        Dockerfile
        ...               # Other frontend client files
docker-compose.yml        # Docker compose file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

* [Clément AUDIC](https://github.com/clementaudic)
* [Yacine BOUKARI](https://github.com/YacineSteeve)
* [Eléazar ZOUBGA](https://github.com/Eleazar-ZOUBGA)
