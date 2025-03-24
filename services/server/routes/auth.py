import os
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, Response, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from libs.database import database
from utils.api_exception import ApiException
from utils.body_parser import parse_request_body

auth_blueprint = Blueprint("auth", __name__, url_prefix="/auth")

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def generate_token(user_id): #Génération d'un token pour 24h de validité
    payload = {
        "userId" : user_id,
        "exp" : datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

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

    token = generate_token(user.id)

    response = make_response(jsonify({"message" : "Login successful"}))
    response.set_cookie("auth_token", token, httponly=True, secure=True, samesite="Strict")

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

    return jsonify({"message": "User registered successfully"})

@auth_blueprint.route("/logout", methods=["POST"])
def logout() -> Response : # Cette fonction permet de supprimer le cookie d'authentification et donc de se déconnecter
    response = make_response(jsonify({"message" : "Logged out"}))
    response.set_cookie("auth_token", "", expires=0, httponly=True, secure=True, samesite="Strict")
    return response

@auth_blueprint.route("/user_informations", methods=["GET"])
def get_user() -> Response:
    """ Permet de récupérer les informations de l'utilisateur si il s'est authentifié via le cookie"""
    token = request.cookies.get("auth_token")
    if not token :
        raise ApiException(code=401, message="Unauthorized")

    try :
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = database.user.find_unique(where={"id" : payload["userId"]})

        if not user :
            raise ApiException(code=401, message="User not found")

        return jsonify({
            "userId" : user.id,
            "firsName" : user.firstName,
            "lastName" : user.lastName,
            "email" : user.email
        })
    except jwt.ExpiredSignatureError :
        raise ApiException(code = 401, message="Token expired")
    except jwt.InvalidTokenError :
        raise ApiException(code=401, message="Invalid token")