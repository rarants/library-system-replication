<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="addHeader">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#add"
        aria-expanded="false"
        aria-controls="add"
      >
        <i class="fas fa-plus text-secondary" />
        <span class="mx-2">Adicionar Livro</span>
      </button>
    </h2>
    <div
      id="add"
      class="accordion-collapse collapse"
      aria-labelledby="addHeader"
    >
      <div class="accordion-body">
        <div class="row">
          <div class="col-lg-6 mb-3">
            <label for="title" class="form-label">Título</label>
            <input
              type="text"
              class="form-control has-validation"
              id="title"
              placeholder="Informe o título do livro"
              v-model="model.newBook.title"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input
              type="text"
              class="form-control"
              id="isbn"
              placeholder="Informe o ISBN do livro"
              v-model="model.newBook.isbn"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <label for="genre" class="form-label">Gênero</label>
            <input
              type="text"
              class="form-control"
              id="genre"
              placeholder="Informe o gênero do livro"
              v-model="model.newBook.genre"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <label for="edition" class="form-label">Edição</label>
            <input
              type="number"
              class="form-control"
              id="edition"
              placeholder="Informe a edição do livro"
              v-model="model.newBook.edition"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <label for="publishingCompany" class="form-label">
              Editora
            </label>
            <input
              type="text"
              class="form-control"
              id="publishingCompany"
              placeholder="Informe a editora do livro"
              v-model="model.newBook.publishingCompany"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <label for="year" class="form-label">Ano</label>
            <input
              type="number"
              class="form-control"
              id="year"
              placeholder="Informe o ano do livro"
              v-model="model.newBook.year"
            />
          </div>
          <div class="col-12 mb-3">
            <label for="authors" class="form-label">Autores</label>
            <textarea
              class="form-control"
              id="authors"
              rows="3"
              placeholder="Informe os autores do livro"
              v-model="model.newBook.authors"
            ></textarea>
          </div>
        </div>
        <div class="center">
          <a
            href="#"
            class="btn btn-primary"
            @click="handleSubmitNewBook()"
          >
            Adicionar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accordion-search',
  data() {
    return {
      model: {
        newBook: {
          title: '',
          isbn: '',
          genre: '',
          edition: null,
          publishingCompany: '',
          year: null,
          authors: '',
        }
      }
    }
  },
  methods: {
    async handleSubmitNewBook() {
      console.log(this.model.newBook)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
