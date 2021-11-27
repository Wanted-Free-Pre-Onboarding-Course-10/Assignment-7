import axios from 'axios';


const getApi = async (trimId: string) => {
    const url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;
    let tireInfo = await axios.get(url).then(info => {
        const frontTire = info.data.spec.driving.frontTire.value;
        const rearTire = info.data.spec.driving.rearTire.value;
        console.log(frontTire, rearTire);
        return { frontTire, rearTire };
    }).catch(console.log);
    return tireInfo;
}

export const carcodapi = { getApi };
