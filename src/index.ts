import app from "./infraestructure/web/app.js";
import { ServerBootstrap } from "./infraestructure/bootstrap/server.bootstrap.js";
import { connectDB } from "./infraestructure/config/data-base.js";

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    const instances = [
        connectDB(), // conexión a la base de datos
        serverBootstrap.initialize(), // inicialización del servidor
      ];
    await Promise.all(instances);
  } catch (error) {
    console.error("Error al iniciar la aplicación", error);
    process.exit(1);
  }
})();
