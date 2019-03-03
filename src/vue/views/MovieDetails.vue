<template>
<div>
  <div v-if="movie == null">
    <p>Film non trouvé avec l'ID {{ this.$route.params.id }}</p>
  </div>

  <div v-if="movie">
    <div>
      <div>
        <img src="https://picsum.photos/170/250" alt="Movie Poster">
      </div>
      <div>
        <h3>{{ movie.title }}</h3>
        <div class="actions">
          <button type="button" v-on:click="$router.push({ name: 'edit_movie', params: { id: movie.id } })">Modifier</button>
          <button type="button" v-on:click="deleteMovie(movie.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div>
      <div>
        <h5>Infos</h5>
        <ul>
          <li><strong>Année</strong> : {{ movie.year }}</li>
          <li><strong>Langue</strong> : {{ movie.language }}</li>
          <li><strong>Genre</strong> : {{ movie.genre }}</li>
        </ul>
      </div>
      <div>
        <h5>Réalisateur</h5>
        <ul>
          <li><strong>Nom</strong> : {{ movie.director.name }}</li>
          <li><strong>Nationalité</strong> : {{ movie.director.nationality }}</li>
          <li><strong>Date de naissance</strong> : {{ movie.director.birthdate }}</li>
        </ul>
      </div>
      <div>
        <h5>Note du film</h5>
        <p>
          {{ movieRate }} / 5
          <small>({{ movie.ratings.length }} notes)</small>
        </p>
      </div>
    </div>
    <hr>
    <div>
      <h5>Donnez votre note : </h5>
      <star-rating :show-rating="false" v-model="userRating"></star-rating>
      <button v-on:click="sendRating()">Noter</button>
    </div>
    <p><router-link :to="{ name: 'home' }">Retour</router-link></p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
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

    movie() {
      return this.movies.find(movie => movie.id == this.id)
    },

    movieRate() {
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  },

  methods: {
    deleteMovie(id) {
      if (confirm("Etes-vous sûr de vouloir supprimer ce film ?")) {
        this.$store.dispatch('deleteMovieInAPI', this.id).then(() => {
          this.$router.push({ name: 'home' })
        });
      }
    },

    sendRating() {
      console.log(this.userRating);
      this.$store.dispatch('rateMovieInAPI', { id: this.id, rating: this.userRating }).then(() => {
        console.log('Notation OK');
      }).catch(() => {
        console.log('Notation KO');
      });
    }
  }
}
</script>
