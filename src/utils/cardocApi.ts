import axios from 'axios';
import { ERROR_MESSAGE } from '../exception/message'

const getCordocApi = async (trimId: string) => {
    const url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;
    let tireInfo = await axios.get(url).then(info => {
        const frontTire: string = info.data.spec.driving.frontTire.value;
        const rearTire: string = info.data.spec.driving.rearTire.value;
        return {
            data: { frontTire, rearTire },
            message: "SUCCESS",
            trimId: null
        };
    }).catch(() => {
        return {
            data: null,
            message: ERROR_MESSAGE.TRIM_NOT_FOUND_EXCEPTION,
            trimId: trimId
        };
    });
    return tireInfo;
}

export const carcodapi = { getCordocApi };
