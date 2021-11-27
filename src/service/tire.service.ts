import { getConnection, Repository } from "typeorm";
import { Tire } from "../entity/tire";
import { carcodapi } from '../utils/cardocApi';
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

    public async getDataFromCardoc(trimList): Promise<any> {
        const data = []
        for (let i = 0; i < trimList.length; i++) {
            const apiData = await carcodapi.getCordocApi(trimList[i])
            data.push(apiData)
            await this.parsingInfo(data[i].frontTire);
            await this.parsingInfo(data[i].rearTire);
        }
        // for (let i = 0; i < data.length; i++) {
        //     const temp = this.parsingInfo(data[i].frontTire)
        //     console.log(temp);
        //     const temp2 = this.parsingInfo(data[i].backTire)
        //     console.log(temp2);
        // }
        // console.log(data);
        return data;
    }
    // public async createTireInfo(trimList) {

    //     for (let i = 0; i < trimList.length; i++) {
    //         const tireInfo = {}
    //         await this.tireRepository.save(width: trimList[i]., aspectRatio:, wheelSize:,: type)
    //     }
    // }

}
