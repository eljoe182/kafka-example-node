import express from "express";
import AppRoutes from "./routes";
import KafkaClient from "./kafka/Client";
import KafkaConsumer from "./kafka/Consumer";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    const router = new AppRoutes(express.Router());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router.getRoutes());
  }

  async events() {
    const kafkaClient = new KafkaClient();
    const kafkaConsumer = new KafkaConsumer(kafkaClient);
    await kafkaConsumer.listen(["topic_52"]);
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
