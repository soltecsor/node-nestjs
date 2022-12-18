import { Content } from "./content"

describe('Content', () => {

    it("should be able to create a notification", () => {

        const content = new Content("Você tem uma nova notificação");
        expect(content).toBeTruthy();
    })
    
    it('should not be able to create a notification content with less than 5 characters', () => {

        const content = new Content("aaa");
        expect(content).toBeTruthy();
    })
    
    it('should not be able to create a notification content with more  than 241 characters', () => {
        const content =  new Content('a'.repeat(251));
        expect(content).toBeTruthy();
    })   

})
