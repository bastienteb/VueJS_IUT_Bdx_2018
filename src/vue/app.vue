<template>
<v-app>
<div>
  <v-toolbar dark color="green">   
      <v-toolbar-title class="black--text"><router-link :to="{ name: 'home' }">{{ title }}</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="black--text" flat :to="{ name: 'add_movie'}">
          Ajoutez un film
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
  <v-container> 
    <main>
      <router-view></router-view>
    </main>
  </v-container>
</div>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'vueJS',
      search: "",
    }
  },
  computed: {
        movies_search: function() {
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        }
    }
}
</script>