from flask import Blueprint, Response, make_response

base_blueprint = Blueprint("base", __name__)

@base_blueprint.route("/")
def index() -> Response:
    response = make_response("The API is running", 200)
    response.mimetype = "text/plain"
    return response
