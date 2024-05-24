import {apiService} from "./apiService";
import {urls} from "../constants";

const commentService = {
    getAll:  () => apiService.get(urls.comments.base),
    getById: (id:number) => apiService.get(urls.comments.byId(id))
}

export {
    commentService
}