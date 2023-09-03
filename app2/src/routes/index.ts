import { Router } from "express";
import AppController from "../controller";
import KafkaProducer from "../kafka/Producer";
import KafkaClient from "../kafka/Client";

export default class AppRoutes {
  private appController: AppController;
  constructor(private router: Router) {
    const kafkaClient = new KafkaClient();
    const kafkaProducer = new KafkaProducer(kafkaClient);
    this.appController = new AppController(kafkaProducer);
    this.init();
  }

  private init() {
    this.router.get("/", this.appController.sendMessage.bind(this.appController));
  }

  public getRoutes() {
    return this.router;
  }
}
