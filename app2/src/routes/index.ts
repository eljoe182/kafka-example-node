import { Router } from "express";
import AppController from "../controller";
import KafkaFactory from "../kafka/ClientFactory";
import KafkaConfig from "../kafka/Config";

export default class AppRoutes {
  private appController: AppController;
  constructor(private router: Router) {
    const kafkaClient = new KafkaFactory(KafkaConfig.getConfig());
    this.appController = new AppController(kafkaClient);
    this.init();
  }

  private init() {
    this.router.get("/", this.appController.sendMessage.bind(this.appController));
  }

  public getRoutes() {
    return this.router;
  }
}
