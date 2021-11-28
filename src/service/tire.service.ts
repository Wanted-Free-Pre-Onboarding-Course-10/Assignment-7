import { getConnection, Repository, Connection, QueryRunner } from "typeorm";
import { Tire } from "../entity/tire";
import { Trim } from "../entity/trim";
import { carcodapi } from '../utils/cardocApi';
import { ERROR_MESSAGE } from '../exception/message'
import { User } from "../entity/user";

export class TireService {
    private tireRepository: Repository<Tire>;
    private trimRepository: Repository<Trim>;
    private userRepository: Repository<User>;

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
                trimId: trimList.noExTrimList[i].trimId,
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

    public async createTireAndTrim(queryRunner: QueryRunner, frontTire, rearTire, trim): Promise<any> {
        console.log(frontTire, rearTire);
        const frontTireInfo = {
            width: frontTire[0],
            aspectRatio: frontTire[1],
            wheelSize: frontTire[2],
            type: 0,
            trim: trim
        }
        const rearTireInfo = {
            width: rearTire[0],
            aspectRatio: rearTire[1],
            wheelSize: rearTire[2],
            type: 1,
            trim: trim
        }
        await queryRunner.manager.getRepository(Tire).save(frontTireInfo);
        await queryRunner.manager.getRepository(Tire).save(rearTireInfo);
    }

    public async createTireInfo(data): Promise<any> {
        console.log(data);
        const queryRunner: QueryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (let i = 0; i < data.parseNoExData.length; i++) {
                const frontTire = data.parseNoExData[i].frontTire;
                const rearTire = data.parseNoExData[i].rearTire;
                const trimId = data.parseNoExData[i].trimId;
                const exUser = await this.userRepository.findOne({
                    where: {
                        username: data.parseNoExData[i].user
                    }, relations: ['trims']
                })
                const trim = await this.trimRepository.save({ id: trimId });
                exUser.trims.push(trim);
                await queryRunner.manager.getRepository(User).save(exUser);
                this.createTireAndTrim(queryRunner, frontTire, rearTire, trim);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    public async linkTireInfo(data): Promise<any> {
        console.log(data);
        for (let i = 0; i < data.exData.length; i++) {
            const trimId = data.exData[i].trimId;
            const exUser = await this.userRepository.findOne({
                where: {
                    username: data.exData[i].user
                }, relations: ['trims']
            })
            const trim = await this.trimRepository.findOne({ id: trimId });
            exUser.trims.push(trim);
            await this.userRepository.save(exUser);
        }
    }
}
