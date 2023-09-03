import KafkaClient from "./Client";

export default class KafkaProducer {
  constructor(private client: KafkaClient) {}

  async send(topic: string, data: any) {
    const producer = await this.client.producerInstance();
    await producer.connect();
    const responseStream = await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
    await producer.disconnect();
    return responseStream;
  }
}
