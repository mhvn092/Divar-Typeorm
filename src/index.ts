import { createConnection } from "typeorm";
import express from "express";
import { AdEntity } from "./entities/ad";
import { CategoryEntity } from "./entities/category";
import { CatfullController } from "./routes/catfull-controller";
import { CatlessController } from "./routes/catless-controller";


const app = express();

async function main() {
  try {
    await createConnection({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      extra: {
        trustServerCertificate: true,
      },
      database: "typeorm",
      synchronize: true,
      entities: [AdEntity,CategoryEntity],
    });

    console.log("database connected");
    app.use(express.json());
    app.use("/api/cat/",CatfullController);
    app.use("/api/un/",CatlessController );

    app.listen(3000, () => console.log("Listening on port 3000"));
  } catch (e: any) {
    console.error(e);
    console.log("connection error");
  }
}

main();
