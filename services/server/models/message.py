from dataclasses import dataclass
from enum import StrEnum

from prisma import Json


class MessageSender(StrEnum):
    USER: str
    AI: str


@dataclass(frozen=True)
class Message:
    sender: MessageSender
    content: str

    @classmethod
    def from_json(cls, json: Json) -> "Message":
        raw_sender = json["sender"]

        if not isinstance(raw_sender, str):
            raise ValueError("Invalid message JSON entry")

        return cls(
            sender=MessageSender(raw_sender),
            content=json["content"]
        )

    @classmethod
    def from_dict(cls, data: dict) -> "Message":
        raw_sender = data["sender"]

        if not isinstance(raw_sender, str):
            raise ValueError("Invalid message entry")

        return cls(
            sender=MessageSender(raw_sender),
            content=data.get("content", "")
        )

    def to_json(self) -> Json:
        return Json({
            "sender": self.sender.value,
            "content": self.content
        })
