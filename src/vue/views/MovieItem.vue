<template>
  <v-flex xs12 pb-4>
    <v-card color="#1976d2" class="white--text"> 
      <v-layout>
        <v-flex xs5>
          <v-img :src="movie.poster || 'https://picsum.photos/170/250'" height="125px" contain></v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title primary-title>
            <div> 
                <v-btn v-on:click="DetailFilm = !DetailFilm">{{ movie.title }}</v-btn>
              <div>
                ({{ movie.year }})
                <div v-if="movie.ratings"> 
                  {{ movieRate }} / 5
                  <small class="text-muted">({{ movie.ratings.length }} notes)</small>
                </div>
              </div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider light></v-divider>

      <v-card-actions class="pa-3">
        <v-flex xs6>
          <p>Donnez votre note : </p>
        </v-flex>
        <v-flex xs7>
          <p>
            <star-rating :star-size="30" :increment="1" :show-rating="false" v-model="userRating"></star-rating>  
          </p>  
        </v-flex>
        <v-flex xs3>
          <v-btn color="success" v-on:click="sendRating(movie.id)">Valider la notation</v-btn>
        </v-flex>
      </v-card-actions>

      <v-divider light></v-divider>
      
      <div class="movie-details pl-2" v-if="DetailFilm" >    
        <p>
          <i>Réalisé par {{ movie.director.name }}</i><br>
          <i>{{ movie.genre }}</i>
        <p>
          <v-btn color="success" :to="{ name: 'edit_movie', params: { id: movie.id } }">Modifier</v-btn>
          <v-btn color="error" v-on:click="deleteMovie(movie.id)" >Supprimer</v-btn>
        </p>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["movie"],
  data: function () {
    return {
      DetailFilm: false,
      userRating: 3
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },
    movieRate() {
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  },
  methods: {
    deleteMovie(id) {
      if (confirm("Etes-vous sûr de vouloir supprimer ce film ?")) {
        this.$store.dispatch('deleteMovieInAPI', id).then(() => {
          this.$router.push({ name: 'home' })
        });
      }
    },

    sendRating(id) {
      console.log(this.userRating);
      this.$store.dispatch('rateMovieInAPI', { id: id, rating: this.userRating }).then(() => {
        console.log('Notation OK');
      }).catch(() => {
        console.log('Notation KO');
      });
    }
  }
}
</script>