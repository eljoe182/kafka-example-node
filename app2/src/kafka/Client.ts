import KafkaFactory from "./ClientFactory";
import KafkaConfig from "./Config";

export default class KafkaClient extends KafkaFactory {
  constructor() {
    super(KafkaConfig.getConfig());
  }

  async consumerInstance() {
    return this.client.consumer({
      groupId: this.config.groupId || "test",
    });
  }

  async producerInstance() {
    return this.client.producer({
      createPartitioner: () => () => 0,
    });
  }
}
