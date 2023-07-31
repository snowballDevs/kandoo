import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:6969', // only need this for development
    withCredentials: true,
});

function DataService() {

    //Auth
    this.getUser = function () {
        return instance.get(`/getUser`);
    };

    this.logout = function () {
        return instance.get(`/logout`);
    };

    this.login = function (data) {
        return instance.post(`/login`, data);
    };

    // Board 
    this.getBoards = () => {
        return instance.get(`/boards`);
    }

    this.createBoard = (data) => {
        return instance.post(`/boards`, data)
    }

    this.deleteBoard = () => {
        return instance.delete(`/boards${boardId}`)
    }

    // Task
    this.createTask = (data) => {
        return instance.post(`boards/${boardId}/tasks`, data)
    }

    this.updateTask = (data) => {
        return instance.put(`/boards/${boardId}/tasks/${taskId}`, data)
    }

    this.deleteTask = () => {
        return instance.delete(`/boards/${boardId}/tasks/${taskId}`)
    }

    // Comments
    this.createComment = (data) => {
        return instance.post(`/boards/${boardId}/tasks/${taskId}/comments`, data)
    }

    this.updateComment = (data) => {
        return instance.put(`/boards/${boardId}/tasks/${taskId}/comments/${commentId}`, data)
    }

    this.likeComment = (data) => {
        return instance.patch(`/boards/${boardId}/tasks/${taskId}/comments/${commentId}`)
    }

    this.deleteComment = (data) => {
        return instance.delete(`/boards/${boardId}/tasks/${taskId}/comments/${commentId}`)
    }
}

// exporting a new instance, so that there will be only one instance throughout the app
export default new DataService();
