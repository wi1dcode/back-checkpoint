import { Country } from "../entities/Country";
import datasource from "../lib/datasource";
import countries from "./countries.json";

async function loadFixtures() {
  await datasource.initialize();
  await datasource.getRepository(Country).clear();

  for (const countryData of countries) {
    const country = new Country();
    country.code = countryData.code;
    country.name = countryData.name;
    country.emoji = countryData.emoji;
    await country.save();
  }

  console.log("Fixtures loaded!");
  await datasource.destroy();
}

loadFixtures().catch((error) => console.log(error));
