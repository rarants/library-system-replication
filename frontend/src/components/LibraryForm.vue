<template>
  <div class="form">
    <div class="center">
      <i class="fas fa-book fa-5x salmon" />
      <h1 class="mt-3">Library</h1>
      <p>
        Código completo disponível no
        <a
          href="https://cli.vuejs.org"
          target="_blank"
          rel="noopener"
          class="salmon"
        >
          github
        </a>
      </p>
    </div>
    <div class="alert alert-danger center mx-5" role="alert" v-if="error">
      <span>
        <i class="fas fa-exclamation-triangle mr-4" />
      </span>
      {{ error }}
      <span>
        <i class="fas fa-exclamation-triangle mr-4" />
      </span>
    </div>
    <!-- <div class="card m-5">
      <div class="card-body">
        <div class="accordion accordion-flush" id="accordionExample">
          <search-book :books="books"/>
          <add-book />
          <edit-book />
          <remove-book />
        </div>
      </div>
    </div> -->
    <div class="row m-5">
      <!-- Insert book -->
      <div class="col-lg-6 col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mt-2">
              <i class="fas fa-plus text-secondary" />
              <span class="mx-2">Adicionar Livro</span>
            </h5>
          </div>
          <div class="card-body">
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
                <label for="publishing_company" class="form-label">
                  Editora
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="publishing_company"
                  placeholder="Informe a editora do livro"
                  v-model="model.newBook.publishing_company"
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
      <!-- Search book -->
      <div class="col-lg-6 col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mt-2">
              <i class="fab fa-sistrix text-secondary" />
              <span class="mx-2">Buscar Livros</span>
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-3">
                <p>
                  <i class="" />
                  Selecione o filtro de busca
                </p>
                <select class="form-select" v-model="selectedFilter">
                  <option value="" selected disabled>
                    Filtrar busca por...
                  </option>
                  <option
                    v-for="(option, index) in searchOptions"
                    :key="index"
                    :value="option.value"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <div
                class="col-lg-12 mb-3"
                v-if="
                  selectedFilter &&
                  selectedFilter !== 'authors' &&
                  selectedFilter !== 'all'
                "
              >
                <label :for="selectedFilter" class="form-label">
                  {{ getFilterName }}
                </label>
                <input
                  type="text"
                  class="form-control"
                  :id="selectedFilter"
                  :placeholder="`${getFilterName} do livro`"
                  v-model="searchBook"
                />
              </div>
              <div class="col-12 mb-3" v-else-if="selectedFilter === 'authors'">
                <label for="authors" class="form-label">Autores</label>
                <textarea
                  class="form-control"
                  id="authors"
                  rows="3"
                  placeholder="Informe os autores do livro"
                  v-model="searchBook"
                ></textarea>
              </div>
            </div>
            <div class="center">
              <a
                href="#"
                class="btn btn-primary"
                @click="handleSubmitSearchBook()"
              >
                Buscar
              </a>
            </div>
            <div v-if="books.length">
              <hr />
              <book-table :books="books" />
            </div>
          </div>
        </div>
      </div>
      <!-- Edit book -->
      <!-- <div class="col-lg-6 col-sm-12">
        <div class="card m-5">
          <div class="card-header">
            <h5 class="card-title mt-2">Editar livro</h5>
          </div>
          <div class="card-body">
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
                  <label for="publishing_company" class="form-label">
                    Editora
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="publishing_company"
                    placeholder="Informe a editora do livro"
                    v-model="model.editBook.publishing_company"
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
                <a
                  href="#"
                  class="btn btn-primary"
                  @click="handleSubmitEditBook()"
                >
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
      </div> -->
      <!-- Remove book -->
      <!-- <div class="col-lg-6 col-sm-12">
        <div class="card m-5">
          <div class="card-header">
            <h5 class="card-title mt-2">Remover livro</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 mb-3">
                <label for="isbn" class="form-label">ISBN</label>
                <input
                  type="text"
                  class="form-control"
                  id="isbn"
                  placeholder="Informe o ISBN do livro"
                  v-model="removeBookIsbn"
                />
              </div>
              <div class="center">
                <a
                  href="#"
                  class="btn btn-primary"
                  @click="handleSubmitRemoveBook()"
                >
                  Remover
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import api from "@/services/api";
/* import AddBook from './Accordion/AddBook.vue'
import EditBook from './Accordion/EditBook.vue'
import RemoveBook from './Accordion/RemoveBook.vue'
import SearchBook from './Accordion/SearchBook.vue' */
import BookTable from "./BookTable.vue";

export default {
  components: { /*EditBook, RemoveBook,  AddBook, SearchBook, */ BookTable },
  name: "library-form",
  data() {
    return {
      searchOptions: [
        {
          value: "all",
          name: "Todos os livros",
        },
        {
          value: "title",
          name: "Título",
        },
        {
          value: "isbn",
          name: "ISBN",
        },
        {
          value: "genre",
          name: "Gênero",
        },
        {
          value: "edition",
          name: "Edição",
        },
        {
          value: "publishing_company",
          name: "Editora",
        },
        {
          value: "year",
          name: "Ano",
        },
        {
          value: "authors",
          name: "Autores",
        },
      ],
      selectedFilter: "",
      searchBook: "",
      editBookIsbn: "",
      removeBookIsbn: "",
      model: {
        newBook: {
          title: "",
          isbn: "",
          genre: "",
          edition: null,
          publishing_company: "",
          year: null,
          authors: "",
        },
        editBook: "",
      },
      books: [],
      error: "",
    };
  },
  methods: {
    async handleSubmitNewBook() {
      try {
        const { data } = await api.post("/books", this.model.newBook);
        this.books = data;
        console.log(this.books, this.selectedFilter, this.searchBook);
        this.error = "";
      } catch (e) {
        this.error =
          "Ocorreu um erro, confira as informações e tente novamente";
      }
    },
    async handleSubmitSearchBook() {
      try {
        let filter = "";
        if (this.selectedFilter && this.searchBook)
          filter = `?filter=${this.selectedFilter}&value=${this.searchBook}`;
        const { data } = await api.get(
          `/books${filter}`
        );
        this.books = data;
        console.log(this.books, this.selectedFilter, this.searchBook);
        this.error = "";
      } catch (e) {
        this.error =
          "Ocorreu um erro, confira as informações e tente novamente";
      }
    },
    async handleSubmitEditBook() {
      console.log(this.model.editBook);
    },
    async handleSubmitRemoveBook() {
      console.log(this.removeBookIsbn);
    },
    async handleSearchInEditBook() {
      console.log(this.editBookIsbn);
    },
  },
  computed: {
    getFilterName() {
      const selectedFilter = this.searchOptions.find(
        (filter) => filter.value === this.selectedFilter,
      )
      return selectedFilter ? selectedFilter.name : null
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
<style>
.center {
  text-align: center;
}
.salmon {
  color: salmon;
}
</style>
