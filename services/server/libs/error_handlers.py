from flask import Flask, Response
from json import dumps
from werkzeug.exceptions import HTTPException

from utils.api_exception import ApiException


def _handle_api_exception(exception: ApiException) -> Response:
    response = Response()
    response.status_code = exception.code
    error = {
        "code": exception.code,
        "message": exception.message,
    }
    response.data = dumps(dict(error=error))
    response.content_type = "application/json"
    return response


def _handle_http_exception(exception: HTTPException) -> Response:
    response = exception.get_response()
    error = {
        "code": exception.code,
        "name": exception.name,
        "message": exception.description,
    }
    response.data = dumps(dict(error=error))
    response.content_type = "application/json"
    return response


def register_error_handlers(app: Flask) -> None:
    app.register_error_handler(ApiException, _handle_api_exception)
    app.register_error_handler(HTTPException, _handle_http_exception)
