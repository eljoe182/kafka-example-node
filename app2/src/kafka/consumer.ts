import KafkaClient from "./client";
import KafkaDeserializer, { Message } from "./deserializer";

export default class KafkaConsumer extends KafkaDeserializer {
  constructor(private client: KafkaClient) {
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
