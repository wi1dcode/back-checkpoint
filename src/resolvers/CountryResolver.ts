import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import CountryServices from "../services/countries.services";

@Resolver()
export class CountryResolver {
    private countryServices = new CountryServices();

    @Query(() => [Country])
    async countries() {
        return await this.countryServices.list();
    }

    @Query(() => Country, { nullable: true })
    async country(@Arg("code") code: string) {
        return await this.countryServices.find(code);
    }

    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
    ): Promise<Country> {
        return await this.countryServices.create({ code, name, emoji });
    }

    @Mutation(() => Country)
    async updateCountry(
        @Arg("code") code: string,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("emoji", { nullable: true }) emoji?: string,
    ): Promise<Country | null> {
        return await this.countryServices.update(code, { name, emoji });
    }

    @Mutation(() => Boolean)
    async deleteCountry(@Arg("code") code: string): Promise<boolean> {
        return await this.countryServices.delete(code);
    }
}
