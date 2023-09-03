import { Router } from "express";
import AppController from "../controller";

export default class AppRoutes {
  constructor(private router: Router){
    this.init();
  }

  private init() {
    this.router.get("/", AppController.sendMessage);
  }

  public getRoutes() {
    return this.router;
  }
}