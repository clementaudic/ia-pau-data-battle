from flask import Blueprint, Flask, request, render_template, redirect, url_for, jsonify
from prisma import Prisma
from werkzeug.security import generate_password_hash, check_password_hash
from libs.database import database

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

# Authentification
@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = database.user.find_unique(where={"email": email})

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Identifiants invalides"}), 401

    return jsonify({"message": "Connexion réussie", "userId": user.id})

# Registration
@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))

    existing_user = database.user.find_unique(where={"email": email})

    if not first_name or not last_name or not email or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    elif existing_user:
        return jsonify({"error": "Cet email est déjà utilisé"}), 400

    user = database.user.create(
        data={
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password
        }
    )

    return jsonify({"message": "Inscription réussie", "userId": user.id})
