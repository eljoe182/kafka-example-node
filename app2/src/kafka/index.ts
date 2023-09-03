import KafkaClient from "./client";
import KafkaConfig, { KafkaConfigOptions } from "./config";
import KafkaConsumer from "./consumer";
import KafkaProducer from "./producer";

export default class KafkaFactory {
  readonly kafkaConfig: KafkaConfigOptions;
  readonly kafkaClient: KafkaClient;
  kafkaConsumer: KafkaConsumer;
  kafkaProducer: KafkaProducer;

  constructor() {
    this.kafkaConfig = KafkaConfig.getConfig();
    this.kafkaClient = new KafkaClient(this.kafkaConfig);
    this.kafkaConsumer = new KafkaConsumer(this.kafkaClient);
    this.kafkaProducer = new KafkaProducer(this.kafkaClient);
  }

  async consumer() {
    console.log("Starting Kafka consumer...");
    await this.kafkaConsumer.listen(["topic_52"]);
  }

  async producer(topic: string, data: any) {
    console.log("Starting Kafka producer...");
    return this.kafkaProducer.send(topic, data);
  }
}
