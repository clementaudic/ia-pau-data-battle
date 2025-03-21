class ApiException(Exception):
    code: int
    message: str

    def __init__(self, code: int = 400, message: str = "An error occurred") -> None:
        self.code = code
        self.message = message
