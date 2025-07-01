export class AppError extends Error {  
    constructor(
        public message: string,
        public statusCode: number,
        public InternalError: any,
    ){
        super(message)
    }   
} 


export class UnprocessableEntity extends AppError {
    constructor(
        public message: any, 
    ){
        super(message, 422, null)
    }
}


export class BadRequest extends AppError{

    constructor(public message: any){
        super(message, 400, null)
    }

}

export class Unauthorized extends AppError{

    constructor(public message: string){
        super(message, 401, null)
    }

}

export class InternalException extends AppError {
    constructor(public message: string, public statusCode: number, public error: any ){
        super(message, 500, error)
    }
}