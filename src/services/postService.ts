import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const postService = {
    getAll: () => apiService.get(urls.posts.base),
    getById: (id:number) => apiService.get(urls.posts.byId(id)),
    getAllById: (id:number) => apiService.get(urls.posts.AllById(id))
}

export {
    postService
}