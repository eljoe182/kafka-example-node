import { KafkaConsumer, Producer } from "node-rdkafka";
import { KafkaConfigOptions } from "./Config";

export default class ClientFactory {
  constructor(private config: KafkaConfigOptions) {}
  public consumer() {
    return new KafkaConsumer(
      {
        "client.id": this.config.clientId,
        "group.id": this.config.groupId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }

  public producer() {
    return new Producer(
      {
        "client.id": this.config.clientId,
        "metadata.broker.list": this.config.brokers,
      },
      {}
    );
  }
}
