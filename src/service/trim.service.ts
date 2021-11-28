import { getConnection, Repository } from "typeorm";
import { Trim } from "../entity/trim";

export class TrimService {
    private trimRepository: Repository<Trim>;

    constructor() {
        this.trimRepository = getConnection().getRepository(Trim);
    }
    // 해당 트림이 있는지 확인하는 로직 
    public async findTrimById(trimList) {
        const exTrimList = [];
        const noExTrimList = [];
        for (let i = 0; i < trimList.length; i++) {
            const trim = await this.trimRepository.findOne({
                where: { id: trimList[i].trimId }
            })
            if (!trim) {
                const info = {
                    user: trimList[i].id,
                    trimId: trimList[i].trimId
                }
                noExTrimList.push(info);
            } else {
                const info = {
                    user: trimList[i].id,
                    trimId: trimList[i].trimId
                }
                exTrimList.push(info);
            }
        }
        const checkTrimList = {
            noExTrimList: noExTrimList,
            exTrimList: exTrimList
        }
        return checkTrimList;
    }

    public async createTrim(createTrimId) {
        const trim = await this.trimRepository.save(createTrimId);
        return trim;
    }

}
