<template>
  <div class="container">
    <h1>Liste des films</h1>
      <v-select v-model="selected" :items="items" label="Select" menu-props="auto" single-line ></v-select>
      <v-text-field color="#4caf50" label="Rechercher" required v-model="search"></v-text-field>
      <v-card class="white--text">
        <MovieItem v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie"  v-on:edit="edit(movie)" v-on:remove="remove(index)"></MovieItem>
      </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['Titre', 'Réalisateur', 'Genre'],
      selected: 'Titre',
      search: '',
      newMovie: {
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: []
      }
    }
  },
  methods: {
    resetNewMovie() {
      this.newMovie = {
        id: undefined,
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: [],
        newPoster: {
          file: null
        },
      };
    },

    createMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      this.$store.dispatch('addMovieToAPI', params).then(id => {
        this.$router.push({ name: 'home'})
      });
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    movies_search: function() {
      switch (this.selected) {
        case "Titre":
          return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          break;
        case "Réalisateur":
          return this.movies.filter(m => m.director.name.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          break;
        case "Genre":
          return this.movies.filter(m => m.genre.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          break;
        default:
          break;
      }           
    }
  }
}
</script>