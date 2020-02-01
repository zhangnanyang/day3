import axios from 'axios';
export default (url, data, method) => {
    let configData = {};
    let type = method === 'get' ? 'params' : 'data';
    configData.method = method;
    configData.url = url;
    configData[type] = data;

    return axios(configData).catch(error => {
        if (error.response && error.response.status === 404) return alert('接口不存在');
        if (error.response && error.response.status === 500) return alert('服务器错误');
    });
};
