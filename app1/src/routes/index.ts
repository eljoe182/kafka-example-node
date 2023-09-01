import { Router } from "express";
import { AppController } from "../controller";
import KafkaConfig from "../kafka/config";

export class AppRouter {
  private appController: AppController;
  constructor(private router: Router) {
    this.appController = new AppController(KafkaConfig.getConfig());
  }

  public init() {
    this.router.get("/", this.appController.sendMessage.bind(this.appController));
  }

  public getRouter() {
    return this.router;
  }
}