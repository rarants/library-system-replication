import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreBookValidator from 'App/Validators/StoreBookValidator'
import Book from 'App/Models/Book'
import UpdateBookValidator from 'App/Validators/UpdateBookValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BooksController {
  public async index({ request } : HttpContextContract) {
    const { filter, value } = request.all()
    const worker = Database
      .connection('mysql2')
      .query()
      .from('books')
      .select('*')
    if (filter && value) worker.where(filter, value)
    await worker
    return worker
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreBookValidator)
    const retur = await Book.create({ ...data })
    this.writeFile(retur, 'store');
    return retur
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
    this.writeFile(book, 'update')
    return book
  }

  public async destroy({ params }: HttpContextContract) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    this.writeFile(book, 'destroy')
    return 
  }

  public async writeFile(book, method) {
    let query = ""
    if (method === 'store') {
      query = "INSERT INTO books VALUES (" + 
        book.id + ", '" +
        book.title + "', '" +
        book.isbn  + "', '" +
        book.genre + "', " + 
        book.edition + ", '" + 
        book.publishing_company + "', " +
        book.year + ", '" +
        book.authors + "', " +
        "default, default);\n"
    } else if (method === 'update') {
      query = "UPDATE books SET title='" + 
        book.title + "', genre='" +
        book.genre + "', edition=" + 
        book.edition + ", publishing_company='" + 
        book.publishing_company + "', year=" +
        book.year + ", authors='" + 
        book.authors + "' WHERE id = " +
        book.id  + ";\n"
    } else if (method === 'destroy') {
      query = "DELETE FROM books WHERE id =  " + 
        book.id + ";\n"
    }
    const fs = require('fs');
    const data = query;
    fs.writeFileSync(`C:\\Users\\Raíssa\\library\\dumps\\dump${Math.floor(Math.random() * 10000000)}.sql`, data, (err) => {
        if (err) throw err;
      console.log('O arquivo foi criado!' + book);
    });
  }
}
