import { getConnection, Repository } from "typeorm";
import { Tire } from "../entity/tire";

export class TireService {
    private tireRepository: Repository<Tire>;

    constructor() {
        this.tireRepository = getConnection().getRepository(Tire);
    }

    public async parsingInfo(info: string) {
        const tireInfo: number[] = [];
        const infoSplit: string[] = info.replace(/\/|R/g, ' ').split(' ');

        if (!info.includes('/') || !info.includes('R'))
            return false;

        if (info.indexOf('/') > info.indexOf('R'))
            return false;

        if (infoSplit.length !== 3)
            return false;

        for (const element of infoSplit) {
            if (!element)
                return false;
            tireInfo.push(Number(element));
        }
        return tireInfo;
    }
}
