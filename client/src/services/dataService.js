import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8888', // only need this for development
    withCredentials: true,
});

function DataService() {
    this.getUser = function () {
        return instance.get(`/getUser`);
    };

    this.logout = function () {
        return instance.get(`/logout`);
    };

    this.login = function (data) {
        return instance.post(`/login`, data);
    };
}

// exporting a new instance, so that there will be only one instance throughout the app
export default new DataService();
