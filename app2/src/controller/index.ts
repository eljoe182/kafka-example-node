import { Request, Response } from "express";
import KafkaProducer from "../kafka/Producer";

export default class AppController extends KafkaProducer {
  public async sendMessage(_req: Request, res: Response) {
    const data = {
      id: "1",
      type: "test",
      timestamp: new Date().toISOString(),
      data: "test data app2",
    };

    const response = await this.send("topic_51", data);

    res.status(200).send({ data, response });
  }
}
