import dotenv from 'dotenv'


const setENV = ()=>{

    //$ process.env.ENVIRONMENT is defined based on script ran from package.json
    //$ Example: Running "npm run dev_local" will set process.env.ENVIRONMENT to "dev" which will load "config/dev.env"
    dotenv.config({path: `config/${process.env.ENVIRONMENT}.env`}) 
    
    //$ These are shared between all environments, example: PORT
    dotenv.config({path: 'config/shared.env'})


     //* Check for required environment variables or throw stop execution.   
    const requiredVars = ['PORT', 'JWT_SECRET']

    requiredVars.forEach((varName)=>{
        if(!process.env[varName]){
            throw new Error(`Missing required environment variable: ${varName}`)
        }
    })

}

setENV()