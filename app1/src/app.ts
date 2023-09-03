import express from "express";
import AppRouter from "./routes";
import KafkaClient from "./kafka/Client";
import KafkaConsumer from "./kafka/Consumer";

export default class Server {
  private port: number;
  private app: express.Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    const router = new AppRouter(express.Router());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router.getRoutes());
  }

  async events() {
    const kafkaClient = new KafkaClient();
    const kafkaConsumer = new KafkaConsumer(kafkaClient);
    await kafkaConsumer.listen(["topic_51"]);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
    this.events().catch((err) => {
      console.error("Error listening Kafka", err);
    });
  }
}
