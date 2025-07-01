import { Request, Response } from 'express';
import fs from 'node:fs'

export const getRequestLogs = async(_req: Request, res: Response)=>{ 

    //¡ ADD PASSCODE VERIFICATION
    const logs = fs.readFileSync('request-log.txt')
    res.send(logs)
}



export const clearRequestLogs = async(_req: Request, res: Response)=>{
    fs.writeFileSync('request-log.txt', '')
    res.send('Logs cleared')
}