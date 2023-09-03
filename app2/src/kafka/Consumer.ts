import KafkaFactory from "./ClientFactory";
import KafkaDeserializer from "./Deserializer";

export default class KafkaConsumer extends KafkaDeserializer {
  constructor(private client: KafkaFactory) {
    super();
  }

  async listen(topics: string[]) {
    const consumer = this.client.client.consumer({
      groupId: "test-app2",
    });

    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message, topic }) => {
        const data = this.deserialize(message);
        console.log({
          topic,
          data,
        });
      },
    });
  }
}
