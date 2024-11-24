import {TagRepositoryImpl} from "../../infrastructure/repositories/tagRepositoryImpl";
import {TagDTO} from "../../core/dto/TagDTO";

export class TagUseCase{
    private readonly tagRepositoryImpl: TagRepositoryImpl;

    constructor(tagRepositoryImpl: TagRepositoryImpl) {
        this.tagRepositoryImpl = tagRepositoryImpl;
    }

    store(tagDTO: TagDTO){
        return this.tagRepositoryImpl.store(tagDTO)
    }

}