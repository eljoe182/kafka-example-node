import Kafka from "node-rdkafka";
import { KafkaDeserializer } from "./Deserializer";
import { Message } from "./Message";

export default class KafkaConsumer extends KafkaDeserializer {
  constructor(readonly client: Kafka.KafkaConsumer) {
    super();
  }

  async listen(topics: string[]) {
    this.client.connect();
    this.client
      .on("ready", () => {
        this.client.subscribe(topics);
        this.client.consume();
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
