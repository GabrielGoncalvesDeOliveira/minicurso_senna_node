import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    
    // POST
    public async store({request, response}: HttpContextContract) {
        const body = request.only(['nome'])
        
        const user = new User()
        user.nome = body.nome

        await user.save()

        response.status(201)

        return { message: 'Usuário criado com sucesso!', data: user, }
    }

    // GET
    public async index() {
        const users = await User.all()

        return { data: users, }
    }

    // DELETE
    public async destroy({ params, response }: HttpContextContract) {
        const userId = Number(params.userId)
        if (!userId) throw new Error('Parametro inválido')

        const existUser = await User.findByOrFail('id', userId)

        await existUser.delete()

        response.status(200)

        return { message: 'Usuário retornado com sucesso', data: existUser }
    }

    // Update
    public async update({ request, response, params }: HttpContextContract) {
        const body = request.only('nome')
        
        const userId = Number(params.userId);
        if (!userId) throw new Error('Parametro inválido')

        const existUser = await User.findByOrFail('id', userId)

        const user = await User.findByOrFail('id', userId)
        
        user.nome = body.nome

        await user.save()

        response.status(200)

        return { message: "Usuário atualizado com sucesso!", data: user }
    }
}
