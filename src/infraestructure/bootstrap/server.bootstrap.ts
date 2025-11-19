import express from "express";
import http from "http";
import envs from "../config/environment-vars.js";

export class ServerBootstrap {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const PORT = Number(envs.PORT ?? 4000);

      server

        .listen(PORT)

        .on("listening", () => {
          console.log(`Server is running on http://localhost:${PORT}`);

          resolve(true);
        })

        .on("error", (error) => {
          console.error(`Se ha generado un error: ${error}`);

          reject(false);
        });
    });
  }
}
