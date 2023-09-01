import Kafka from "node-rdkafka";
import { KafkaConfigOptions } from "./config";
import KafkaSerializer from "./serializer";

interface Message {
  id: string;
  type: string;
  timestamp: string;
  data: string;
}

export default class KafkaProducer extends KafkaSerializer<Message> {
  private kafka: Kafka.Producer;

  constructor(private config: KafkaConfigOptions) {
    super();
    this.kafka = new Kafka.Producer(
      {
        "client.id": this.config.clientId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }

  async send(topic: string, data: any) {
    this.kafka.connect();
    this.kafka
      .on("ready", () => {
        this.kafka.produce(
          topic,
          null,
          this.serialize(data),
          null,
          Date.now()
        );
        this.kafka.flush(10000, () => {
          console.log("Message sent to Kafka");
        });
      })
      .on("event.error", (err) => {
        console.error("Error from Kafka", err);
      })
      .on("event.log", (log) => {
        console.log("Log from Kafka", log);
      });
  }
}
