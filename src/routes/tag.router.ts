import { Router } from "express";
import { TagController } from "../interface/http/tagController";
import {TagUseCase} from "../application/usecases/tagUseCase";
import {TagRepositoryImpl} from "../infrastructure/repositories/tagRepositoryImpl";

const router: Router = Router();

const tagRepository = new TagRepositoryImpl();
const tagUseCase = new TagUseCase(tagRepository);
const tagController = new TagController(tagUseCase);

router.post("/store", (req, res) => {
    tagController.store(req, res)
});

export default router;
