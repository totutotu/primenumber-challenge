const baseUrl = process.env.REACT_APP_BACKEND ? `${process.env.REACT_APP_BACKEND}/` : `/`


const parseSumAndCheckValue = (querystring, resData) => {
    return `Sum of numbers: ${querystring} is: ${resData.result}. This ${resData.isPrime ? 'IS a prime number' : 'is NOT a prime number'}`
}

const parseGetCheckPrimeValue = (querystring, resData) => {
    return `${querystring} ${resData.isPrime ? 'IS a prime number' : 'is NOT a prime number'}`
}

export const getSumAndCheck = async(query) => {

    try {
        const res = await fetch(`${baseUrl}api/sumandcheck?numbers=${query}`);
        const data = await res.json();
        if (res.ok) {
            return { type: 'ok', value: parseSumAndCheckValue(query, data) };
        } else {
            console.error(data);
            return { type: 'error', value: 'failed fetching data' };
        }
    } catch (error) {
        console.log(error);
        return { type: 'error', value: 'failed fetching data' };
    }
};

export const getCheckPrime = async(query) => {

    try {
        const res = await fetch(`${baseUrl}api/checkprime?number=${query}`);
        const data = await res.json();
        if (res.ok) {
            return { type: 'ok', value: parseGetCheckPrimeValue(query, data) };
        } else {
            console.error(data);
            return { type: 'error', value: 'failed fetching data' };
        }
    } catch (error) {
        console.error(error);
        return { type: 'error', value: 'failed fetching data' };
    }
};