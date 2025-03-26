from datetime import timedelta, datetime, timezone

from functools import wraps
from typing import Optional

from flask import Flask, Response
from flask_jwt_extended import JWTManager, set_access_cookies, create_access_token, unset_jwt_cookies, get_jwt, \
    verify_jwt_in_request, get_current_user
from prisma.models import User

from libs.config.env import EnvConfig
from libs.database import database
from utils.api_exception import ApiException
from utils.serialize import serialize_user, SerializedUser


def init_auth(app: Flask) -> None:
    app.config["JWT_SECRET_KEY"] = EnvConfig.SECRET_KEY
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
    app.config["JWT_ACCESS_COOKIE_NAME"] = "auth_token"
    app.config["JWT_SESSION_COOKIE"] = False
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"


    jwt = JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_loader(user: User) -> str:
        return user.id


    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data) -> Optional[SerializedUser]:
        identity = jwt_data["sub"]
        user = database.user.find_unique(where={"id": identity})
        return serialize_user(user)


    @app.after_request
    def refresh_expiring_jwts(response) -> Response:
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_current_user())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response


def authenticate_user(response: Response, user: User) -> None:
    token = create_access_token(identity=user)
    set_access_cookies(response, token)


def remove_authentication(response: Response) -> None:
    unset_jwt_cookies(response)


def authentication_required(fn):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
            except Exception as e:
                print(e)
                raise ApiException(code=401, message="You must be authenticated to perform this action")

            return func(*args, **kwargs)

        return wrapper

    return decorator(fn)


def get_authenticated_user() -> SerializedUser:
    return get_current_user()
