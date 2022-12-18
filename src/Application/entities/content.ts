export class Content{
    private readonly content: string;


get value(){
    return this.content;
}

private validateContentLength(content: string): boolean{
    return content.length > 5 && content.length < 240;
}

constructor(content: string){

    const isContentValidateLength = this.validateContentLength(content);
    
    if (!this.validateContentLength){
        throw new Error('Content length error.');
    }

     this.content = content;
    }

}