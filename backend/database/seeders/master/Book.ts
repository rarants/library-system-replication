import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run methodawait 
    Book.createMany([
      {
        title: "Sistemas Operacionais",
        isbn: "85-7307-530-9",
        genre: "Educacional",
        publishing_company: "Artes Médicas Sul Ltda.",
        year: 2000,
        authors: "Andrew S. Tanenbaum, Albert S. Woodhull"
      },
    ])
  }
}
