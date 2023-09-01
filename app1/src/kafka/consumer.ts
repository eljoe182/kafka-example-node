import Kafka from "node-rdkafka";
import { KafkaConfigOptions } from "./config";
import { KafkaDeserializer } from "./deserializer";

export default class KafkaConsumer extends KafkaDeserializer {
  private kafka: Kafka.KafkaConsumer;

  constructor(private config: KafkaConfigOptions) {
    super();
    this.kafka = new Kafka.KafkaConsumer(
      {
        "client.id": this.config.clientId,
        "group.id": this.config.groupId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }

  async listen(topics: string[]) {
    this.kafka.connect();
    this.kafka
      .on("ready", () => {
        this.kafka.subscribe(topics);
        this.kafka.consume();
        console.log("Listening Kafka on topics:", topics.join(", "));
      })
      .on("data", (data) => {
        console.log("Message from Kafka");
        const deserialize = this.deserialize(data);
        console.log(deserialize);
      })
      .on("event.error", (err) => {
        console.error("Error from Kafka", err);
      })
      .on("event.log", (log) => {
        console.log("Log from Kafka", log);
      });
  }
}
