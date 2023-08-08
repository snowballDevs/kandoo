import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:6969', // only need this for development
    withCredentials: true,
});

function DataService() {
    // Auth
    this.getUser = () => instance.get(`/getUser`);

    this.logout = () => instance.get(`/logout`);

    this.login = (data) => instance.post(`/login`, data);

    this.signup = (data) => instance.post('./signup', data);

    // Board
    this.getBoards = () => instance.get(`/boards`);

    this.createBoard = (data) => instance.post(`/boards`, data);

    this.deleteBoard = (boardId) => instance.delete(`/boards/${boardId}`);

    // Task
    this.createTask = (data) => instance.post(`boards/${boardId}/tasks`, data);

    this.updateTask = (data) =>
        instance.put(`/boards/${boardId}/tasks/${taskId}`, data);

    this.deleteTask = () =>
        instance.delete(`/boards/${boardId}/tasks/${taskId}`);

    // Comments
    this.createComment = (data) =>
        instance.post(`/boards/${boardId}/tasks/${taskId}/comments`, data);

    this.updateComment = (data) =>
        instance.put(
            `/boards/${boardId}/tasks/${taskId}/comments/${commentId}`,
            data
        );

    this.likeComment = (data) =>
        instance.patch(
            `/boards/${boardId}/tasks/${taskId}/comments/${commentId}`
        );

    this.deleteComment = (data) =>
        instance.delete(
            `/boards/${boardId}/tasks/${taskId}/comments/${commentId}`
        );
}

// exporting a new instance, so that there will be only one instance throughout the app
export default new DataService();
