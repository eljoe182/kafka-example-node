export interface KafkaConfigOptions {
  clientId: string;
  brokers: string;
  groupId?: string;
}

export default class KafkaConfig {
  static getConfig(): KafkaConfigOptions {
    return {
      clientId: process.env.KAFKA_CLIENT_ID || "my-app-2",
      brokers: process.env.KAFKA_BROKERS || "localhost:9092",
      groupId: process.env.KAFKA_GROUP_ID || "test-app2",
    };
  }
}
