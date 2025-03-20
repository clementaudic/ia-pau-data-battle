from typing import Any, TypedDict, List, override

from flask import Request

from utils.api_exception import ApiException

Field = TypedDict("Field", {
    "name": str,
    "key": str,
    "type": type,
    "required": bool,
})

class Body(dict):
    @override
    def __getitem__(self, key: str) -> Any:
        return super().__getitem__(key)

    @override
    def get(self, key: str, default: Any = None) -> Any:
        return super().get(key, default)


def parse_request_body(request: Request, fields: List[Field]) -> Body:
    body = request.json

    if body is None:
        raise ApiException(code=400, message="Request body is required")

    if not isinstance(body, dict):
        raise ApiException(code=400, message="Request body must be a JSON object")

    data = Body()

    for field in fields:
        value = body.get(field["key"])

        if value is None and field["required"]:
            raise ApiException(code=400, message=f"{field['name']} is required")
        elif not isinstance(value, field["type"]):
            raise ApiException(code=400, message=f"{field['name']} must be of type {field['type'].__name__}")

        data[field["key"]] = value

    return data
