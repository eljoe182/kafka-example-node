import { Message } from "./Message";

export default class KafkaDeserializer {
  public deserialize(message: Message) {
    if (!message.value) return;

    const data = message.value.toString();
    const messageObj = JSON.parse(data);
    const key = message.key?.toString() || "";
    const timestamp = Number(message.timestamp) || Date.now();
    return {
      key,
      data: messageObj,
      timestamp: new Date(timestamp),
      headers: message.headers,
    };
  }
}
