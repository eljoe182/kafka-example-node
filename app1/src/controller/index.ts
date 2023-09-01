import { Request, Response } from "express";
import KafkaProducer from "../kafka/producer";

export class AppController extends KafkaProducer {
  public sendMessage(_req: Request, res: Response): void {
    const data = {
      id: "1",
      type: "test",
      timestamp: new Date().toISOString(),
      data: "test data app1",
    };

    this.send("topic_52", data);

    res.status(200).send(data);
  }
}
