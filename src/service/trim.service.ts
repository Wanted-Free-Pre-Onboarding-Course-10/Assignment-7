import { getConnection, Repository } from "typeorm";
import { Trim } from "../entity/trim";

export class TrimService {
    private trimRepository: Repository<Trim>;

    constructor() {
        this.trimRepository = getConnection().getRepository(Trim);
    }
    // 해당 트림이 있는지 확인하는 로직 
    public async findTrimById(trimList) {
        const checkTrimList: string[] = [];
        for (let i = 0; i < trimList.length; i++) {
            const trim = await this.trimRepository.findOne({
                where: { id: trimList[i].trimId }
            })
            if (!trim) {
                checkTrimList.push(trimList[i].trimId);
            }
        }
        return checkTrimList;
    }
    public async createTrim(createTrimInfo) {
        const trim = await this.trimRepository.save(createTrimInfo);
        return trim;
    }

}
