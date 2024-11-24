import {TagEntity} from "../entities/tagEntity";
import {TagDTO} from "../dto/TagDTO";

export interface TagInterface{
    store(tagDTO: TagDTO): Promise<TagEntity>
}