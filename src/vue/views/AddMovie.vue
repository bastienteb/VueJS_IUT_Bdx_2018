<template>
    <v-form enctype="multipart/form-data">
    <v-container>
      <h5>Film</h5>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field label="Titre" placeholder="ex: Titanic" v-model="movie.title"></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm6 md3>
          <v-text-field label="Année" placeholder="ex: 1997" v-model="movie.year"></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm6 md3>
          <v-text-field label="Genre" placeholder="ex: Drame" v-model="movie.genre"></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm6 md3>
          <v-text-field label="Langue" placeholder="ex: Américain" v-model="movie.language"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <h5>Poster</h5>
            <input type="file" ref="posterInput" id="poster" accept=".png, .jpg, .jpeg" v-on:change="processFile($event)">
        </v-flex>
      </v-layout>

      <h5>Réalisateur</h5>
      <v-layout>
        <v-flex xs12 sm6 md3>
          <v-text-field label="Réalisateur" placeholder="ex: James Camero" v-model="movie.director.name"></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm6 md3>
          <v-text-field label="Nationalité" placeholder="ex: Canadien" v-model="movie.director.nationality"></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm6 md3>
          <v-text-field label="Date de naissance" placeholder="ex: 1954-08-16" v-model="movie.director.birthdate"></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn color="success" v-on:click="createMovie()">Sauvegarder</v-btn>
      <v-btn color="error" v-on:click="$router.push({ name: 'home' })">Retour</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return{
      reader: new FileReader(),
      Newposter: {
            file: null
      },
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },

    movie() {
      if (this.movies.find(movie => movie.id == this.id)){
        this.add = false;
        return this.movies.find(movie => movie.id == this.id);
      }
      else{
        this.add=true;
        return {
          title: '',
          year: null,
          language: '',
          director: {
              name: '',
              nationality: '',
              birthdate: ''
          },
          genre: '',
          ratings: [5,1]
        }
      }
     
    }
  },
  methods: {
    processFile($event) {
      this.movie.poster = null;

      this.Newposter.file = $event.target.files[0];
      var self = this;
      this.reader.onload = function (e) {
        self.preview = e.target.result;
      };

      if (this.Newposter.file) {
        this.reader.readAsDataURL(this.Newposter.file);
      }
    },
    updateMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      console.log(params);
      this.$store.dispatch('updateMovieInAPI', params).then(() => {
        this.$router.push({ name: 'home'})
      });
    },
    createMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      this.$store.dispatch('addMovieToAPI', params).then(id => {
        this.$router.push({ name: 'home'})
      });
      
    }
  }
}
</script>
