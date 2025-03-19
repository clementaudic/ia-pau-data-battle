from dataclasses import dataclass
from enum import StrEnum, auto
from json import dumps, loads
from typing import List

class MessageSender(StrEnum):
    USER = auto()
    AI = auto()


@dataclass(frozen=True)
class Message:
    sender: MessageSender
    content: str

    @classmethod
    def from_json(cls, json: str) -> "Message":
        data = loads(json)

        if not isinstance(data, dict):
            raise ValueError("Invalid message JSON data")

        raw_sender = data.get("sender")

        if not isinstance(raw_sender, str):
            raise ValueError("Invalid message JSON data")

        return cls(
            sender=MessageSender(raw_sender),
            content=data.get("content", "")
        )

    @classmethod
    def many_from_json(cls, jsons: List[str]) -> List["Message"]:
        return [cls.from_json(json) for json in jsons]

    @property
    def to_json(self) -> str:
        return dumps({
            "sender": self.sender,
            "content": self.content
        })
