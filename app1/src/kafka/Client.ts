import KafkaFactory from "./ClientFactory";
import KafkaConfig, { KafkaConfigOptions } from "./Config";
import KafkaConsumer from "./Consumer";
import KafkaProducer from "./Producer";

export default class KafkaClient {
  readonly kafkaConfig: KafkaConfigOptions;
  readonly kafkaClient: KafkaFactory;
  kafkaConsumer: KafkaConsumer;
  kafkaProducer: KafkaProducer;

  constructor() {
    this.kafkaConfig = KafkaConfig.getConfig();
    this.kafkaClient = new KafkaFactory(this.kafkaConfig);
    this.kafkaConsumer = new KafkaConsumer(this.kafkaClient.consumer());
    this.kafkaProducer = new KafkaProducer(this.kafkaClient.producer());
  }

  public async consumer() {
    console.log("Starting Kafka consumer...");
    await this.kafkaConsumer.listen(["topic_51"]);
  }

  public async producer(topic: string, data: any) {
    console.log("Starting Kafka producer...");
    return this.kafkaProducer.send(topic, data);
  }
}