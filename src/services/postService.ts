import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IPost} from "../interfaces";

const postService = {
    getAll: (): IRes<IPost[]> => apiService.get(urls.posts.base),
    getById: (id:number): IRes<IPost>  => apiService.get(urls.posts.byId(id)),
    getAllById: (id:number): IRes<IPost[]> => apiService.get(urls.posts.AllById(id)),
    create: (data: IPost): IRes<IPost> => apiService.post(urls.posts.base, data),
    update: (id: number, data: IPost): IRes<IPost> => apiService.put(urls.posts.byId(id), data),
    delete: (id:number) => apiService.delete(urls.posts.byId(id))
}

export {
    postService
}