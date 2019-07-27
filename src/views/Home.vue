<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <task-list class="task-list"></task-list>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TaskList from "@/components/TaskList.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    TaskList
  },
  mounted: function() {
    this.$store.dispatch("fetchTodaysTasks");
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.task-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25rem;
  margin-left: auto;
}
</style>
