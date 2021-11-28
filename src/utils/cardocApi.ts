import axios from 'axios';
import { TrimNotFoundException } from '../exception/trim_not_found_exception'

const getCordocApi = async (trimId: string) => {
    const url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;
    let tireInfo = await axios.get(url).then(info => {
        if (info.data.code == -1000) {
            throw new TrimNotFoundException(trimId)
        }
        const frontTire: string = info.data.spec.driving.frontTire.value;
        const rearTire: string = info.data.spec.driving.rearTire.value;
        return { frontTire, rearTire };
    }).catch(console.log);


    return tireInfo;
}

export const carcodapi = { getCordocApi };
