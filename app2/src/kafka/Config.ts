export interface KafkaConfigOptions {
  clientId: string;
  brokers: string;
}

export default class KafkaConfig {
  static getConfig(): KafkaConfigOptions {
    return {
      clientId: process.env.KAFKA_CLIENT_ID || "my-app-2",
      brokers: process.env.KAFKA_BROKERS || "localhost:9092",
    };
  }
}
