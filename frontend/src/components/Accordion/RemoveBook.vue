<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="removeHeader">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#remove"
        aria-expanded="false"
        aria-controls="remove"
      >
        <i class="far fa-trash-alt text-secondary" />
        <span class="mx-2">Remover Livro</span>
      </button>
    </h2>
    <div
      id="remove"
      class="accordion-collapse collapse"
      aria-labelledby="removeHeader"
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
  </div>
</template>

<script>
export default {
  name: 'accordion-search',
  data() {
    return {
      removeBookIsbn: '',
    }
  },
  methods: {
    async handleSubmitRemoveBook() {
      console.log(this.removeBookIsbn)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
