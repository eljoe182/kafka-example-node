import KafkaClient from "./client";

export default class KafkaProducer {
  constructor(private client: KafkaClient) {}

  async send(topic: string, data: any) {
    const producer = this.client.client.producer();
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
