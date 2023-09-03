import { Request, Response } from "express";
import KafkaFactory from "../kafka";

export default class AppController {
  static async sendMessage(_req: Request, res: Response) {
    const data = {
      id: "1",
      type: "test",
      timestamp: new Date().toISOString(),
      data: "test data app2",
    };

    const kafkaProducer = new KafkaFactory();

    const response = await kafkaProducer.producer("topic_51", data);

    res.send({ data, response });
  }
}
