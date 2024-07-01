import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "countries.db",
  entities: [Country],
  synchronize: true,
  logging: ["error", "query"],
});

export default AppDataSource;
