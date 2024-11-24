import { TagInterface } from "../../core/interfaces/tagInterface";
import { TagEntity } from "../../core/entities/tagEntity";
import Tag from "../database/schema/tagSchema";
import {TagDTO} from "../../core/dto/TagDTO";

export class TagRepositoryImpl implements TagInterface {
    private readonly tagModel;

    constructor(tagModel = Tag) {
        this.tagModel = tagModel;
    }

    async store(tagDTO: TagDTO): Promise<TagEntity> {
        const tagEntity: TagEntity = new TagEntity(tagDTO.name)
        const createdTag = await this.tagModel.create(tagEntity);
        return new TagEntity(createdTag.name);
    }
}
