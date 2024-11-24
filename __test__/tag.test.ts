import { TagUseCase } from "../src/application/usecases/tagUseCase";
import {TagRepositoryImpl} from "../src/infrastructure/repositories/tagRepositoryImpl";
import {TagDTO} from "../src/core/dto/TagDTO";

jest.mock("../src/application/usecases/tagUseCase");

describe("Tag Crud Test", () => {
    let tagUseCase: TagUseCase
    beforeEach(() => {
        const tagRepository = new TagRepositoryImpl();
        tagUseCase = new TagUseCase(tagRepository)
    })
   it('should create an tag', () => {
       const name: string = 'my tag';
       const store = jest.spyOn(tagUseCase, "store");
       const tagDTO: TagDTO = {
           name
       }
       tagUseCase.store(tagDTO)
       expect(store).toBeCalledTimes(1)
       expect(store).toBeCalledWith(tagDTO)
   })
});
