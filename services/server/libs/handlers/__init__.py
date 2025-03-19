from flask import Flask
from werkzeug.exceptions import HTTPException

from libs.handlers.errors import handle_api_error, handle_http_exception
from utils.api_exception import ApiException


def register_error_handlers(app: Flask):
    app.register_error_handler(ApiException, handle_api_error)
    app.register_error_handler(HTTPException, handle_http_exception)
