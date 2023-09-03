import { KafkaConsumer, Producer } from "node-rdkafka";
import { KafkaConfigOptions } from "./Config";

export default class KafkaFactory {
  constructor(private config: KafkaConfigOptions) {}
  public consumerInstance() {
    return new KafkaConsumer(
      {
        "client.id": this.config.clientId,
        "group.id": this.config.groupId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }

  public producerInstance() {
    return new Producer(
      {
        "client.id": this.config.clientId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }
}
