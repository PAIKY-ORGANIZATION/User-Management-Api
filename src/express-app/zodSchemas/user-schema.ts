import { z } from 'zod'


export const signupSchema = z.object({
    body: z.object({
        username: z.string({required_error: 'Username is required'}).min(1).nonempty(),
        email: z.string().email('Invalid email').nonempty('Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
        image: z.string().optional()
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().nonempty('Password is required'),
    })
});

export type SignupSchemaType = z.infer<typeof signupSchema>['body']
export type LoginSchemaType = z.infer<typeof loginSchema>['body']