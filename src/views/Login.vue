<template>
  <div class="login">
    <v-card class="login__card">
      <h1>Burner List for Todoist</h1>
      <v-btn @click="authenticate()">Todoist Login</v-btn>
    </v-card>
  </div>
</template>
<script>
import * as uuidv4 from "uuid/v4";
export default {
  methods: {
    authenticate: function() {
      window.location.href = `https://todoist.com/oauth/authorize?client_id=fa66c46a9121421eb22d7911dcedfbcf&scope=data:read_write&state=${uuidv4()}`;
    }
  },
  mounted: function() {
    console.log(this.$route.query);
    if (this.$route.query.state && this.$route.query.code) {
      console.log("setting app state and code");
      this.$store.commit("setAppState", this.$route.query.state);
      this.$store.commit("setAppCode", this.$route.query.code);
      this.$store.dispatch("authenticate");
      this.$router.push({ name: "home" });
    }
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
 