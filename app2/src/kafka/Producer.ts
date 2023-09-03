import KafkaClient from "./Client";
import KafkaSerializer from "./Serializer";

export default class KafkaProducer extends KafkaSerializer<any> {
  constructor(private client: KafkaClient) {
    super();
  }

  async send(topic: string, data: any) {
    const producer = await this.client.producerInstance();
    await producer.connect();
    const responseStream = await producer.send({
      topic,
      messages: [
        {
          value: this.serialize(data),
        },
      ],
    });
    await producer.disconnect();
    return responseStream;
  }
}
