import { getConnection, Repository } from "typeorm";
import { Trim } from "../entity/trim";

export class TrimService {
    private trimRepository: Repository<Trim>;

    constructor() {
        this.trimRepository = getConnection().getRepository(Trim);
    }
    // 해당 트림이 있는지 확인하는 로직 
    public async findTrimById(id: number) {
        const trim = await this.trimRepository.findOne({
            where: { id }
        })
        return trim;
    }
    public async createTrim(createTrimInfo) {
        const trim = await this.trimRepository.save(createTrimInfo);
        return trim;
    }
}
