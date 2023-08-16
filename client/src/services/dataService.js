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

    this.joinBoard = (data) => instance.post('/joinBoard', data); 

    this.deleteBoard = (boardId) => instance.delete(`/boards/${boardId}`);

    // Column
    this.createColumn = (data) => instance.post(`boards/${boardId}/columns`, data);

    this.updateColumn = (data) =>
        instance.put(`/boards/${boardId}/columns/${columnId}`, data);

    this.deleteColumn = () =>
        instance.delete(`/boards/${boardId}/columns/${columnId}`);

    // Task
    this.createTask = (data) => instance.post(`/boards/${boardId}/columns/${columnId}/tasks`, data);

    this.updateTask = (data) =>
        instance.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, data);

    this.deleteTask = () =>
        instance.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);

    // Comments
    this.createComment = (data) =>
        instance.post(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}/comments`, data);

    this.updateComment = (data) =>
        instance.put(
            `/boards/${boardId}/columns/${columnId}/tasks/${taskId}/comments/${commentId}`,
            data
        );

    this.likeComment = (data) =>
        instance.patch(
            `/boards/${boardId}/columns/${columnId}/tasks/${taskId}/comments/${commentId}`
        );

    this.deleteComment = (data) =>
        instance.delete(
            `/boards/${boardId}/columns/${columnId}/tasks/${taskId}/comments/${commentId}`
        );
}

// exporting a new instance, so that there will be only one instance throughout the app
export default new DataService();
