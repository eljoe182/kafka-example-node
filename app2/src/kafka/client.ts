import { KafkaConfigOptions } from "./config";
import { Kafka } from "kafkajs";

export default class KafkaClient {
  public client: Kafka;
  constructor(private config: KafkaConfigOptions) {
    this.client = new Kafka({
      brokers: this.config.brokers.split(","),
      clientId: this.config.clientId,
    });
  }
}
