<template>
  <div>
    <button @click="authenticate()"></button>
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
</style>
