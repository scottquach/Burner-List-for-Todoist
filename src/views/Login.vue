<template>
  <div class="login">
    <v-card class="login__card">
      <h1>Burner List for Todoist</h1>
      <v-btn @click="authenticate()">Todoist Login</v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  methods: {
    authenticate: function() {
      window.location.href =
        "https://todoist.com/oauth/authorize?client_id=c&scope=data:read&state=asdfasdfasdf";
    }
  },
  mounted: function() {
    // this.$store.dispatch("authenticate");
  }
};
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login__card {
  padding: 1.5rem;
}
</style>
 