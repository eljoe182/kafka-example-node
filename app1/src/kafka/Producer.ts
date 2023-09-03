import Kafka from "node-rdkafka";
import KafkaSerializer from "./Serializer";
import { Message } from "./Message";


export default class KafkaProducer extends KafkaSerializer<Message> {
  constructor(private client: Kafka.Producer) {
    super();
  }

  async send(topic: string, data: any) {
    this.client.connect();
    this.client
      .on("ready", () => {
        this.client.produce(
          topic,
          null,
          this.serialize(data),
          null,
          Date.now()
        );
        this.client.flush(10000, () => {
          console.log("Message sent to Kafka");
        });
        this.client.disconnect();
      })
      .on("event.error", (err) => {
        console.error("Error from Kafka", err);
      })
      .on("event.log", (log) => {
        console.log("Log from Kafka", log);
      });
  }
}
