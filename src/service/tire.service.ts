import { getConnection, Repository } from "typeorm";
import { Tire } from "../entity/tire";
import { carcodapi } from '../utils/cardocApi';
export class TireService {
    private tireRepository: Repository<Tire>;

    constructor() {
        this.tireRepository = getConnection().getRepository(Tire);
    }

    public async parsingInfo(info: string): Promise<any> {
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

    public async getDataFromCardoc(trimList): Promise<any> {
        const data = [];
        const parseData = []

        for (let i = 0; i < trimList.length; i++) {
            console.log(trimList[i]);
            const apiData = await carcodapi.getCordocApi(trimList[i].trim)
            data.push(apiData)
            const parsInfo = {
                user: trimList[i].user,
                frontTire: await this.parsingInfo(data[i].frontTire),
                rearTire: await this.parsingInfo(data[i].rearTire)
            }
            parseData.push(parsInfo);
        }
        console.log(parseData);
        return { parseData };
    }
    public async createTireInfo(parsingRear, parsingFront): Promise<any> {

        // for (let i = 0; i < trimList.length; i++) {
        //     const tireInfo = {}
        //     await this.tireRepository.save(width: trimList[i]., aspectRatio:, wheelSize:,: type)
        // }
    }

}
