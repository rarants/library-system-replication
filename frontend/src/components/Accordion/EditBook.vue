<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="editHeader">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#edit"
        aria-expanded="false"
        aria-controls="edit"
      >
        <i class="far fa-edit text-secondary" />
        <span class="mx-2">Editar Livro</span>
      </button>
    </h2>
    <div
      id="edit"
      class="accordion-collapse collapse"
      aria-labelledby="editHeader"
    >
      <div class="accordion-body">
        <div class="row">
          <div class="col-lg-12 mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input
              type="text"
              class="form-control"
              id="isbn"
              placeholder="Informe o ISBN do livro"
              v-model="editBookIsbn"
            />
          </div>
          <div class="center mb-3">
            <a
              href="#"
              class="btn btn-secondary"
              @click="handleSearchInEditBook()"
            >
              Buscar
            </a>
          </div>
        </div>
        <div v-if="model.editBook">
          <hr />
          <div class="row">
            <div class="col-lg-6 mb-3">
              <label for="title" class="form-label">Título</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Informe o título do livro"
                v-model="model.editBook.title"
              />
            </div>
            <div class="col-lg-6 mb-3">
              <label for="isbn" class="form-label">ISBN</label>
              <input
                type="text"
                class="form-control"
                id="isbn"
                placeholder="Informe o ISBN do livro"
                v-model="model.editBook.isbn"
              />
            </div>
            <div class="col-lg-6 mb-3">
              <label for="genre" class="form-label">Gênero</label>
              <input
                type="text"
                class="form-control"
                id="genre"
                placeholder="Informe o gênero do livro"
                v-model="model.editBook.genre"
              />
            </div>
            <div class="col-lg-6 mb-3">
              <label for="edition" class="form-label">Edição</label>
              <input
                type="number"
                class="form-control"
                id="edition"
                placeholder="Informe a edição do livro"
                v-model="model.editBook.edition"
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
                v-model="model.editBook.publishingCompany"
              />
            </div>
            <div class="col-lg-6 mb-3">
              <label for="year" class="form-label">Ano</label>
              <input
                type="number"
                class="form-control"
                id="year"
                placeholder="Informe o ano do livro"
                v-model="model.editBook.year"
              />
            </div>
            <div class="col-12 mb-3">
              <label for="authors" class="form-label">Autores</label>
              <textarea
                class="form-control"
                id="authors"
                rows="3"
                placeholder="Informe os autores do livro"
                v-model="model.editBook.authors"
              ></textarea>
            </div>
          </div>
          <div class="center">
            <a href="#" class="btn btn-primary" @click="handleSubmitEditBook()">
              Salvar alterações
            </a>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-warning center" role="alert">
            <span>
              <i class="fas fa-exclamation-triangle mr-4" />
            </span>
            Busque o livro pelo seu ISBN antes de continuar
            <span>
              <i class="fas fa-exclamation-triangle mr-4" />
            </span>
          </div>
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
      editBookIsbn: '',
      model: {
        editBook: ''
      },
    }
  },
  methods: {
    async handleSubmitEditBook() {
      console.log(this.model.editBook)
    },
    async handleSearchInEditBook() {
      console.log(this.editBookIsbn)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
