from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Backend is working!"}), 200



@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    if not body:
        raise APIException("Missing request body", 400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email and password are required", 400)

    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("User already exists", 400)

    
    hashed_password = generate_password_hash(password)

    
    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201



@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if not body:
        raise APIException("Missing request body", 400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email and password are required", 400)

    
    user = User.query.filter_by(email=email).first()
    if not user:
        raise APIException("Invalid email or password", 401)

    
    if not check_password_hash(user.password, password):
        raise APIException("Invalid email or password", 401)

    
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "token": access_token
    }), 200



@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({
        "message": "This is a protected route",
        "user": user.serialize()
    }), 200