import express from "express";
import { AppRouter } from "./routes";
import KafkaClient from "./kafka";

export default class Server {
  private port: number;
  private app: express.Application;
  private kafka: KafkaClient;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    const router = new AppRouter(express.Router());
    router.init();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router.getRouter());
    this.kafka = new KafkaClient();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
    this.kafka.consumer();
  }
}
