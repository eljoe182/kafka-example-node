import { Router } from "express";
import AppController from "../controller";
import ClientFactory from "../kafka/ClientFactory";
import KafkaConfig from "../kafka/Config";

export default class AppRoutes {
  private appController: AppController;
  constructor(private router: Router) {
    const client = new ClientFactory(KafkaConfig.getConfig());
    this.appController = new AppController(client.producer());
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      this.appController.sendMessage.bind(this.appController)
    );
  }

  public getRoutes() {
    return this.router;
  }
}
