import { KafkaDeserializer } from "./Deserializer";
import { Message } from "./Message";
import KafkaClient from "./Client";

export default class KafkaConsumer extends KafkaDeserializer {
  constructor(readonly client: KafkaClient) {
    super();
  }

  async listen(topics: string[]) {
    const consumer = this.client.consumerInstance();
    consumer.connect();
    consumer
      .on("ready", () => {
        consumer.subscribe(topics);
        consumer.consume();
        console.log("Listening Kafka on topics:", topics.join(", "));
      })
      .on("data", (data: Message) => {
        console.log("Message from Kafka");
        const deserialize = this.deserialize(data);
        console.log(deserialize);
      })
      .on("event.error", (err: any) => {
        console.error("Error from Kafka", err);
      })
      .on("event.log", (log: any) => {
        console.log("Log from Kafka", log);
      });
  }
}
