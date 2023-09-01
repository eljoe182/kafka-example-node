import KafkaConfig, { KafkaConfigOptions } from "./config";
import KafkaConsumer from "./consumer";

export default class KafkaClient {
  readonly kafkaConfig: KafkaConfigOptions;
  kafkaConsumer: KafkaConsumer;

  constructor() {
    this.kafkaConfig = KafkaConfig.getConfig();
    this.kafkaConsumer = new KafkaConsumer(this.kafkaConfig);
  }

  public async consumer() {
    console.log("Starting Kafka consumer...");
    this.kafkaConsumer.listen(["topic_51"]);
  }
}