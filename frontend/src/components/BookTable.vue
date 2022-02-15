<template>
  <div>
    <div class="table-responsive rounded-top">
      <div class="alert alert-danger center" role="alert" v-if="error">
        <span>
          <i class="fas fa-exclamation-triangle mr-4" />
        </span>
        {{ error }}
        <span>
          <i class="fas fa-exclamation-triangle mr-4" />
        </span>
      </div>
      <div class="alert alert-success center" role="alert" v-if="success">
        {{ success }}
      </div>
      <table class="table table-hover table-borderless align-middle">
        <thead class="table-secondary text-muted">
          <tr>
            <th scope="col" class="table-col">#</th>
            <th scope="col" class="table-col">ISBN</th>
            <th scope="col" class="table-col">Título</th>
            <th scope="col" class="table-col">Gênero</th>
            <th scope="col" class="table-col">Edição</th>
            <th scope="col" class="table-col">Editora</th>
            <th scope="col" class="table-col">Ano</th>
            <th scope="col" class="table-col">Autores</th>
            <th scope="col" class="table-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in books" :key="index">
            <th scope="row">{{ row.id }}</th>
            <td>{{ row.isbn }}</td>
            <td>{{ row.title }}</td>
            <td>{{ row.genre }}</td>
            <td>{{ row.edition }}</td>
            <td>{{ row.publishing_company }}</td>
            <td>{{ row.year }}</td>
            <td>{{ row.authors }}</td>
            <td>
              <button
                type="button"
                class="btn btn-info mx-1"
                title="Editar livro"
                @click="handleOpenModal(row)"
              >
                <i class="far fa-edit text-light" />
              </button>
              <button
                type="button"
                class="btn btn-danger m-1"
                title="Remover livro"
                @click="handleRemoveBook(row.id)"
              >
                <i class="far fa-trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div v-if="showModal">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <p class="modal-title">
                    <i class="far fa-edit text-secondary" />
                    Editar livro
                  </p>
                  <button
                    type="button"
                    class="btn btn-light"
                    @click="showModal = false"
                  >
                    <i class="fas fa-times text-secondary" />
                  </button>
                </div>
                <div class="modal-body mt-4 px-4">
                  <h4 class="center salmon mb-4">
                    Editar ISBN {{ model.editBook.isbn }}
                  </h4>
                  <div class="row">
                    <div class="col-lg-12 mb-3">
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
                  <div class="alert alert-danger center" role="alert" v-if="error">
                    <span>
                      <i class="fas fa-exclamation-triangle mr-4" />
                    </span>
                    {{ error }}
                    <span>
                      <i class="fas fa-exclamation-triangle mr-4" />
                    </span>
                  </div>
                  <div class="alert alert-success center" role="alert" v-if="success">
                    {{ success }}
                  </div>
                  <div class="center mb-4">
                    <a
                      href="#"
                      class="btn btn-primary"
                      @click="handleUpdateBook()"
                    >
                      Salvar alterações
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "@/services/api";
export default {
  name: "book-table",
  props: {
    books: Array,
  },
  data() {
    return {
      showModal: false,
      model: {
        editBook: null,
      },
      error: "",
      success: ""
    };
  },
  methods: {
    handleOpenModal(row) {
      this.model.editBook = Object.assign({}, row);
      this.showModal = true;
    },
    async handleUpdateBook() {
      try {
        await api.put(
          `/books/${this.model.editBook.id}`,
          this.model.editBook
        );
        this.error = "";
        this.success = "Alterações salvas com sucesso. Atualize a busca para conferir.";
      } catch (e) {
        this.success = "";
        this.error =
          "Ocorreu um erro ao salvar, confira as informações e tente novamente";
      }
    },
    async handleRemoveBook(book_id) {
      try {
        await api.delete(
          `/books/${book_id}`);
        this.error = "";
        this.success = "Livro removido com sucesso. Atualize a busca para conferir.";
        const index = this.books.indexOf(book=> {
          book.id === book_id
        });
        console.log(index)
        //this.books.splice(index, 1)
      } catch (e) {
        this.success = "";
        this.error =
          "Ocorreu um erro ao remover, confira as informações e tente novamente";
      }
    },
  },
};
</script>
<style scoped>
.table-col {
  font-weight: 500;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
