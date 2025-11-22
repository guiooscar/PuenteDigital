import express from "express";
import http from "http";
import envs from "../config/environment-vars.js";

export class ServerBootstrap {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }
  // Define el método. Como iniciar un servidor toma tiempo y puede fallar, se usa una Promise
  initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Crea el servidor HTTP de Node.js usando la aplicación Express (this.app) como manejador de todas las peticiones.
      const server = http.createServer(this.app);
      // Obtiene el puerto. Si envs.PORT (la variable de entorno) no existe, usa 4000 por defecto.
      const PORT = Number(envs.PORT ?? 4000);
      // Enciende el servidor para que empiece a escuchar peticiones en el puerto definido.
      server.listen(PORT)

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
