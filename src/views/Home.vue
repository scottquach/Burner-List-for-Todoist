<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <div class="burners">
      <burner-list type="front"></burner-list>
      <div class="flex-col">
        <burner-list type="back" style="flex: 1;"></burner-list>
        <burner-list type="misc" style="flex:1;"></burner-list>
      </div>
    </div>

    <task-list class="task-list"></task-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskList from "@/components/TaskList.vue";
import BurnerList from "@/components/BurnerList.vue";

export default {
  name: "home",
  components: {
    TaskList,
    BurnerList
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

.burners {
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
</style>
