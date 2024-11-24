import { Request, Response } from "express";
import { TagUseCase } from "../../application/usecases/tagUseCase";
import { TagDTO } from "../../core/dto/TagDTO";
import {TagEntity} from "../../core/entities/tagEntity";

export class TagController {
    private readonly tagUseCase: TagUseCase;

    constructor(tagUseCase: TagUseCase) {
        this.tagUseCase = tagUseCase;
    }

    async store(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: "Name is required" });
            }
            const tagDTO: TagDTO = new TagDTO(name);
            const tag: TagEntity = await this.tagUseCase.store(tagDTO);
            return res.status(201).json({ success: true, data: tag });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}

