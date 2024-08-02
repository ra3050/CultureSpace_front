export const AxiosHttpData = {
    baseURL: `http://${window.location.hostname}:8080/`, //실버서 연결시 해당부분 수정
    // baseURL: '192.168.1.116:8428',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json',
    responseEncoding: 'json'
};
