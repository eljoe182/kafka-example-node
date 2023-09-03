import KafkaClient from "./Client";
import KafkaDeserializer from "./Deserializer";

export default class KafkaConsumer extends KafkaDeserializer {
  constructor(readonly client: KafkaClient) {
    super();
  }

  async listen(topics: string[]) {
    console.log("Listening Kafka on topics:", topics.join(", "));
    const consumer = await this.client.consumerInstance();
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
