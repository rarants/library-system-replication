import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreBookValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string(),
    isbn: schema.string(),
    genre: schema.string(),
    edition: schema.number(),
    publishing_company: schema.string(),
    year: schema.number(),
    authors: schema.string(),
  })
  public messages = {
    'title.required': 'É obrigatório informar o título do livro.',
    'isbn.required': 'É obrigatório informar o isbn do livro.',
    'genre.required': 'É obrigatório informar o gênero do livro.',
    'edition.required': 'É obrigatório informar a edição do livro.',
    'publishing_company.required': 'É obrigatório informar a editora do livro.',
    'year.required': 'É obrigatório informar o ano do livro.',
    'authors.required': 'É obrigatório informar os autores do livro.'
  }
}
