import { Message } from "node-rdkafka";

interface MessageDeserialized {
  type: string;
  timestamp: Date;
  data: string;
}

export class KafkaDeserializer {
  public deserialize(message: Message): MessageDeserialized | undefined {
    if (!message.value) return;

    const data = message.value.toString();
    const messageObj = JSON.parse(data);
    const topic = message.topic;
    const timestamp = message.timestamp || Date.now();
    return {
      data: messageObj,
      type: topic,
      timestamp: new Date(timestamp),
    }
  }
}