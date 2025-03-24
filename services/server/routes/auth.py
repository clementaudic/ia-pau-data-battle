from flask import Blueprint, request, jsonify, Response
from werkzeug.security import generate_password_hash, check_password_hash
from libs.database import database
from utils.api_exception import ApiException
from utils.auth import authenticate_user, remove_authentication, authentication_required, get_authenticated_user
from utils.body_parser import parse_request_body

auth_blueprint = Blueprint("auth", __name__, url_prefix="/auth")

AUTH_COOKIE_NAME = "auth_token"

@auth_blueprint.route("/login", methods=["POST"])
def login() -> Response:
    data = parse_request_body(request, [
        {"name": "email", "key": "email", "type": str, "required": True},
        {"name": "password", "key": "password", "type": str, "required": True}
    ])

    email = data.get("email")
    password = data.get("password")

    user = database.user.find_unique(where={"email": email})

    if not user or not check_password_hash(user.password, password):
        raise ApiException(code=401, message="Wrong credentials")

    response = jsonify({"userId": user.id})

    authenticate_user(response, user)

    return response


@auth_blueprint.route("/register", methods=["POST"])
def register() -> Response:
    data = parse_request_body(request, [
        {"name": "firstName", "key": "firstName", "type": str, "required": True},
        {"name": "lastName", "key": "lastName", "type": str, "required": True},
        {"name": "email", "key": "email", "type": str, "required": True},
        {"name": "password", "key": "password", "type": str, "required": True}
    ])

    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    password = generate_password_hash(data.get("password"))

    existing_user = database.user.find_unique(where={"email": email})

    if existing_user:
        raise ApiException(code=409, message="User with this email already exists")

    user = database.user.create(
        data={
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password
        }
    )

    response = jsonify({"userId": user.id})

    authenticate_user(response, user)

    return response


@auth_blueprint.route("/logout", methods=["POST"])
def logout() -> Response :
    response = jsonify({"message" : "Logged out"})
    remove_authentication(response)
    return response


@auth_blueprint.route("/profile", methods=["GET"])
@authentication_required
def get_user() -> Response:
    return jsonify(get_authenticated_user())
