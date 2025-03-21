from dataclasses import dataclass
from enum import StrEnum

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from prisma import Json


class MessageSender(StrEnum):
    USER: str = "USER"
    AI: str = "AI"


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

    def to_lc_message(self) -> BaseMessage:
        match self.sender:
            case MessageSender.USER:
                return HumanMessage(content=self.content)
            case MessageSender.AI:
                return AIMessage(content=self.content)

        raise ValueError("Invalid message sender")
