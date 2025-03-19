import json

from flask import Response
from werkzeug.exceptions import HTTPException

from utils.api_exception import ApiException


def handle_api_error(exception: ApiException):
    response = Response()
    response.status_code = exception.code
    error = {
        "code": exception.code,
        "message": exception.message,
    }
    response.data = json.dumps(dict(error=error))
    response.content_type = "application/json"
    return response


def handle_http_exception(exception: HTTPException):
    response = exception.get_response()
    error = {
        "code": exception.code,
        "name": exception.name,
        "message": exception.description,
    }
    response.data = json.dumps(dict(error=error))
    response.content_type = "application/json"
    return response
