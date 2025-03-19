from flask import Blueprint, Flask, request, render_template, redirect, url_for, jsonify
from prisma import Prisma
from werkzeug.security import generate_password_hash, check_password_hash

db = Prisma()
db.connect()

auth = Blueprint('auth', __name__)

# Create a User
@auth.route('/create', methods=['POST'])
def create_user():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))

    if not first_name or not last_name or not email or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    user = db.user.create(
        data={
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password
        }
    )

    return jsonify({"message": "Utilisateur créé avec succès", "userId": user.id})

# Authentification
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = db.user.find_unique(where={"email": email})

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Identifiants invalides"}), 401

    return jsonify({"message": "Connexion réussie", "userId": user.id})

# Registration
@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))

    existing_user = db.user.find_unique(where={"email": email})
    if existing_user:
        return jsonify({"error": "Cet email est déjà utilisé"}), 400

    user = db.user.create(
        data={
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password
        }
    )

    return jsonify({"message": "Inscription réussie", "userId": user.id})
