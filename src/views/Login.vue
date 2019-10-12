<template>
  <div class="login">
    <!-- <v-card class="login__card"> -->
    <div class="login__action">
      <div class="header">
        <h1>Burner List for Todoist</h1>
        <p>
          Based on the acclaimed paper based focused to-dos by
          <i>Jake Knapp</i>
        </p>
      </div>
      <v-progress-circular v-if="loading" indeterminate style="align-self: center"></v-progress-circular>
      <v-btn
        class="login-button"
        v-if="!loading"
        @click="authenticate()"
        color="#e44332"
        style="color: white;"
      >Todoist Login</v-btn>
    </div>
    <div class="login__info">
      <div>
        <div class="info__item">
          <span>
            <v-icon class="inline" style="margin-right: .5rem;" color="#e44332">mdi-sync</v-icon>
            <h2 class="inline">Syncs with Todoist</h2>
          </span>
          <p>Tasks moved to a burner list are automatically assigned labels for management within the Todoist app</p>
        </div>
        <div class="info__item">
          <span>
            <v-icon class="inline" style="margin-right: .5rem;" color="blue">mdi-security</v-icon>
            <h2 class="inline">Privacy focused</h2>
          </span>
          <p>No private information is stored, everything is managed through the official Todoist API</p>
        </div>
        <div class="info__item">
          <span>
            <v-icon class="inline" style="margin-right: .5rem;" color="black">mdi-view-week</v-icon>
            <h2 class="inline">Simple Interface</h2>
          </span>
          <p>Clean UI with no frills, ads, or pop-ups</p>
        </div>
      </div>
    </div>

    <!-- </v-card> -->
  </div>
</template>
<script>
import * as uuidv4 from "uuid/v4";
export default {
  data: {
    loading: false
  },
  methods: {
    authenticate: function() {
      window.location.href = `https://todoist.com/oauth/authorize?client_id=fa66c46a9121421eb22d7911dcedfbcf&scope=data:read_write&state=${uuidv4()}`;
    }
  },
  mounted: function() {
    console.log(this.$route.query);
    if (this.$route.query.state && this.$route.query.code) {
      // console.log("setting app state and code");
      loading = true;
      this.$store.commit("setAppState", this.$route.query.state);
      this.$store.commit("setAppCode", this.$route.query.code);
      this.$store.dispatch("authenticate");
    }
  }
};
</script>

<style lang="scss">
%flex-col {
  display: flex;
  flex-direction: column;
}

%flex-row {
  display: flex;
  flex-direction: row;
}

%flex-center {
  justify-content: center;
  align-items: center;
}

.login {
  @extend %flex-row;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-button {
  width: 50%;
}

.login__action {
  @extend %flex-col;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background-color: #eceef3;
  flex-grow: 1;
}

.login__info {
  @extend %flex-col;
  @extend %flex-center;
  text-align: start;
  height: 100%;
  flex-grow: 2;
  padding: 1.5rem;
}

.header {
  @extend %flex-col;
  align-items: flex-start;
  text-align: start;
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
}

.info__item {
  @extend %flex-col;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.inline {
  display: inline;
}

.login__card {
  padding: 1.5rem;
}
</style>
 