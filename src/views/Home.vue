<template>
  <div class="home">
    <div class="home__content">
      <div class="burners">
        <burner-list type="Front_Burner"></burner-list>
        <div class="flex-col">
          <burner-list type="Back_Burner" style="flex: 1;"></burner-list>
          <burner-list type="Misc_Burner" style="flex:1;"></burner-list>
        </div>
      </div>

      <task-list class="task-list"></task-list>
    </div>
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
    // console.log(this.$router);
    this.$store.dispatch("configureBurnerLabels");
    this.$store.dispatch("fetchAllTasks");
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.home__content {
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
