<template>
  <div class="task-list">
    <h1>Todays tasks</h1>
    <draggable v-model="allTasks" group="type">
      <transition-group>
        <task-item v-for="item in allTasks" :key="item.id" :item="item"></task-item>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";

export default {
  components: {
    draggable,
    TaskItem
  },
  computed: {
    allTasks: {
      get() {
        return this.$store.getters.todaysTasks;
      },
      set(value) {
        this.$store.commit("updateTodaysTasks", value);
      }
    }
  }
};
</script>
<style scoped>
.task-list {
  transition: 0.3s;
  box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
}
</style>
