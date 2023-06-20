import { FastifyInstance } from 'fastify'
import {number, z} from 'zod'
import {prisma} from './lib/prisma'
import dayjs from 'dayjs'

export async function AppRoutes(app: FastifyInstance) {
    // rota para criar um user
    // app.post('/user', async (request) => {
    //     const postBody  = z.object({
    //             username: z.string(),
    //             password: z.string(), 
    //             email: z.string()       
    //         })
    //     const {username, password, email} = postBody.parse(request.body)
    //     const created_at = dayjs().startOf('day').toDate() // sem hora, minuto e segundo
    //     const newUser = await prisma.user.create({
    //         data: {
    //             username,
    //             password, 
    //             email,
    //             created_at
    //     }
    //     })
    //     return newUser
    // })

    //  // rota para recuperar um user
    //  app.get('/user/:username/:password', async (request) => {
    //     const getBody  = z.object({
    //             username: z.string(),
    //             password: z.string(), 
    //         })
    //     const {username, password } = getBody.parse(request.params)
    //     const user = await prisma.user.findMany({
    //         where: {
    //             username: username,
    //             password: password
    //         }
    //     })
    //     return user
    // })

    app.get('/messages', async (request) => {
        const messages = await prisma.message.findMany()
        return messages
    })

    //rota para adicionar likes ou dislikes
    app.post('/message', async (request) => {
        const getBody = z.object({
            title: z.string(),
            content: z.string(),
        })
        const {title, content} = getBody.parse(request.body)
        const newMessage = await prisma.message.create({
            data: {
                title: title,
                content: content,
                published: true,
                likes: 0,
                dislikes: 0,
            }
        })
        return newMessage
    })

    app.patch('/like/:message_id', async (request) => {
        const getBody = z.object({
            likes: z.number(),
            dislikes: z.number(),
        })
        const getId = z.object({
            message_id: z.string(),
        })
        const {likes, dislikes} = getBody.parse(request.body)
        const {message_id} = getId.parse(request.params) 
        const message = await prisma.message.update({
            data: {
                likes: likes,
                dislikes: dislikes,
            },
            where: {
                id: Number(message_id),
            }
        })
        return message
    })
}