import KafkaFactory from "./ClientFactory";
import KafkaConfig from "./Config";

export default class KafkaClient extends KafkaFactory {
  constructor() {
    super(KafkaConfig.getConfig());
  }
}