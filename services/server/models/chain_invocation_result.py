from typing import Optional

from models.message import Message


class ChainInvocationResult:
    def __init__(self, is_successful: bool, result: Optional[Message] = None) -> None:
        self._is_successful = is_successful
        self._result = result

    @property
    def is_successful(self) -> bool:
        return self._is_successful

    @property
    def result(self) -> Optional[Message]:
        return self._result
