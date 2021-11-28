import { getConnection, Repository, Connection } from "typeorm";
import { Tire } from "../entity/tire";
import { Trim } from "../entity/trim";
import { carcodapi } from '../utils/cardocApi';
import { ERROR_MESSAGE } from '../exception/message'
import { User } from "../entity/user";

export class TireService {
    private tireRepository: Repository<Tire>;
    private trimRepository: Repository<Trim>;
    private userRepository: Repository<User>;
    private connection: Connection;

    constructor() {
        this.tireRepository = getConnection().getRepository(Tire);
        this.trimRepository = getConnection().getRepository(Trim);
        this.userRepository = getConnection().getRepository(User);
    }

    public async parsingInfo(info: string): Promise<any> {
        const tireInfo: number[] = [];
        const infoSplit: string[] = info.replace(/\/|R/g, ' ').split(' ');

        if (!info.includes('/') || !info.includes('R'))
            return ERROR_MESSAGE.TIRE_IFNO_EXCEPTION;

        if (info.indexOf('/') > info.indexOf('R'))
            return ERROR_MESSAGE.TIRE_IFNO_EXCEPTION;

        if (infoSplit.length !== 3)
            return ERROR_MESSAGE.TIRE_IFNO_EXCEPTION;

        for (const element of infoSplit) {
            if (!element)
                return ERROR_MESSAGE.TIRE_IFNO_EXCEPTION;
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
            // 공공 API에 해당 TRIMID가 없는 경우
            if (apiData.message == ERROR_MESSAGE.TRIM_NOT_FOUND_EXCEPTION)
                return {
                    trimId: apiData.trimId,
                    message: ERROR_MESSAGE.TRIM_NOT_FOUND_EXCEPTION
                }
            data.push(apiData.data)
            const parsInfo = {
                user: trimList.noExTrimList[i].user,
                frontTire: await this.parsingInfo(data[i].frontTire),
                rearTire: await this.parsingInfo(data[i].rearTire)
            }
            // 타이어 비정상 경우
            if (parsInfo.frontTire == ERROR_MESSAGE.TIRE_IFNO_EXCEPTION || parsInfo.rearTire == ERROR_MESSAGE.TIRE_IFNO_EXCEPTION)
                return {
                    trimId: apiData.trimId,
                    message: ERROR_MESSAGE.TIRE_IFNO_EXCEPTION
                };
            parseNoExData.push(parsInfo);
        }
        return {
            message: "SUCCESS",
            data: { parseNoExData, exData },
        };
    }

    public async createTireInfo(parseData): Promise<any> {

        // for (let i = 0; i < parseData.parseNoExData.length; i++) {
        //     const user = await this.userRepository.findOne()
        //     const queryRunner = this.connection.createQueryRunner();
        //     await queryRunner.connect();
        //     await queryRunner.startTransaction();
        //     try {
        //         const trim = await this.trimRepository.save({ id: parseData.parseNoExData[i].id });
        //         await queryRunner.commitTransaction();
        //     } catch (error) {

        //     }
        // }
        // for (let i = 0; i < parseData.exData.length; i++) {

        // }
    }

}
