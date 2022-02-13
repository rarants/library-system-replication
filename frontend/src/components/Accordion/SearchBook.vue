<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="searchHeader">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#search"
        aria-expanded="false"
        aria-controls="search"
      >
        <i class="fab fa-sistrix text-secondary" />
        <span class="mx-2">Buscar Livros</span>
      </button>
    </h2>
    <div
      id="search"
      class="accordion-collapse collapse show"
      aria-labelledby="searchHeader"
    >
      <!-- Search book -->
      <div class="accordion-body">
        <div class="row">
          <div class="col-12 mb-3">
            <p>
              <i class="fas fa-search" />
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
          <a href="#" class="btn btn-primary" @click="handleSubmitSearchBook()">
            Buscar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/services/api";
export default {
  name: 'accordion-search',
  props: {
    books: Array
  },
  data() {
    return {
      searchOptions: [
        {
          value: 'all',
          name: 'Todos os livros',
        },
        {
          value: 'title',
          name: 'Título',
        },
        {
          value: 'isbn',
          name: 'ISBN',
        },
        {
          value: 'genre',
          name: 'Gênero',
        },
        {
          value: 'edition',
          name: 'Edição',
        },
        {
          value: 'publishingCompany',
          name: 'Editora',
        },
        {
          value: 'year',
          name: 'Ano',
        },
        {
          value: 'authors',
          name: 'Autores',
        },
      ],
      selectedFilter: '',
      searchBook: '',
    }
  },
  methods: {
    async handleSubmitSearchBook() {
      try {
        const { data } = await api.get("/books");
        console.log(data)
        console.log(this.books)
        console.log(this.selectedFilter, this.searchBook)
      } catch (e) {
        this.error = "Ocorreu um erro, confira as informações e tente novamente";
        console.log(e)
      }
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
