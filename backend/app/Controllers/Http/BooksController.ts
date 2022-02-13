import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreBookValidator from 'App/Validators/StoreBookValidator'
import Book from 'App/Models/Book'
import UpdateBookValidator from 'App/Validators/UpdateBookValidator'

export default class BooksController {
  public async index({ request } : HttpContextContract) {
    const { filter, value } = request.all()
    const books = Book.query()
    if (filter && value) books.where(filter, value)
    await books
    return books
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreBookValidator)
    return await Book.create({ ...data })
  }

  public async show({ params }: HttpContextContract) {
    const books = await Book.findOrFail(params.id)
    return books
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UpdateBookValidator)
    const book = await Book.findOrFail(params.id)
    book.merge(data)
    await book.save()
    return book
  }

  public async destroy({ params }: HttpContextContract) {
    const book = await Book.findOrFail(params.id)
    return await book.delete()
  }
}
