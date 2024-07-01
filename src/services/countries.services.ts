import { Country } from "../entities/Country";
import datasource from "../lib/datasource";
import { Repository } from "typeorm";

class CountryServices {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async create(data: Partial<Country>) {
    const existingCountry = await this.db.findOne({ where: { code: data.code } });
    if (existingCountry) {
      throw new Error(`Le pays avec le code ${data.code} existe déjà`);
    }
    const newCountry = this.db.create(data);
    await this.db.save(newCountry);
    return newCountry;
  }

  async list() {
    return await this.db.find();
  }

  async find(code: string) {
    const country = await this.db.findOne({ where: { code } });
    if (!country) {
      throw new Error(`Pays avec le code ${code} non trouvé`);
    }
    return country;
  }

  async update(code: string, data: Partial<Country>) {
    const country = await this.find(code);
    if (!country) {
      throw new Error(`Pays avec le code ${code} non trouvé`);
    }
    Object.assign(country, data);
    await this.db.save(country);
    return country;
  }

  async delete(code: string) {
    const country = await this.find(code);
    await this.db.remove(country);
    return true;
  }
}

export default CountryServices;
