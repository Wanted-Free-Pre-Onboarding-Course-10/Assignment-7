import { getConnection, Repository } from "typeorm";
import { Tire } from "../entity/tire";
import { carcodapi } from '../utils/cardocApi';
import { TireInfoException } from '../exception/tire_info_exception'
export class TireService {
    private tireRepository: Repository<Tire>;

    constructor() {
        this.tireRepository = getConnection().getRepository(Tire);
    }

    public async parsingInfo(info: string): Promise<any> {
        const tireInfo: number[] = [];
        const infoSplit: string[] = info.replace(/\/|R/g, ' ').split(' ');

        if (!info.includes('/') || !info.includes('R'))
            throw new TireInfoException(info);

        if (info.indexOf('/') > info.indexOf('R'))
            throw new TireInfoException(info);

        if (infoSplit.length !== 3)
            throw new TireInfoException(info);

        for (const element of infoSplit) {
            if (!element)
                throw new TireInfoException(info);
            tireInfo.push(Number(element));
        }
        return tireInfo;
    }

    public async getDataFromCardoc(trimList): Promise<any> {
        const data = [];
        const parseNoExData = [];
        const exData = trimList.exTrimList;
        for (let i = 0; i < trimList.noExTrimList.length; i++) {
            const apiData = await carcodapi.getCordocApi(trimList.noExTrimList[i].trim)
            data.push(apiData)
            const parsInfo = {
                user: trimList.noExTrimList[i].user,
                frontTire: await this.parsingInfo(data[i].frontTire),
                rearTire: await this.parsingInfo(data[i].rearTire)
            }
            parseNoExData.push(parsInfo);
        }
        return { parseNoExData, exData };
    }
    public async createTireInfo(parseData): Promise<any> {

    }

}
