import KafkaSerializer from "./Serializer";
import KafkaClient from "./Client";


export default class KafkaProducer extends KafkaSerializer<any> {
  constructor(private client: KafkaClient) {
    super();
  }

  async send(topic: string, data: any) {
    const producer = this.client.producerInstance();
    producer.connect();
    producer
      .on("ready", () => {
        producer.produce(
          topic,
          null,
          this.serialize(data),
          null,
          Date.now()
        );
        producer.flush(10000, () => {
          console.log("Message sent to Kafka");
        });
        producer.disconnect();
      })
      .on("event.error", (err) => {
        console.error("Error from Kafka", err);
      })
      .on("event.log", (log) => {
        console.log("Log from Kafka", log);
      });
  }
}
