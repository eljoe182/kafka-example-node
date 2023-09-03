import express from "express";
import AppRoutes from "./routes";
import KafkaFactory from "./kafka";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    const router = new AppRoutes(express.Router());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(router.getRoutes());
  }

  async events() {
    const kafka = new KafkaFactory();
    await kafka.consumer();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
    this.events().catch((err) => {
      console.error("Error listening Kafka", err);
    });
  }
}
