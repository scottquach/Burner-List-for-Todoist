<template>
  <div class="task-list">
    <div style="display: flex; flex-direction: row;">
      <img style="margin-right: 1rem;" class="icon--md" src="@/assets/sunrise.svg" />
      <h1>Todays tasks</h1>
    </div>

    <v-list rounded color="#fafafa">
      <v-list-item-group>
        <draggable v-model="allTasks" group="type" @change="change($event)">
          <transition-group>
            <task-item v-for="item in allTasks" :key="item.id" :item="item"></task-item>
          </transition-group>
        </draggable>
      </v-list-item-group>
    </v-list>
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
  methods: {
    change: function(event) {
      if (event.added) {
        this.$store.dispatch("returnItemToToday", {
          task: event.added.element
        });
      }
    }
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
  height: 100vh;
}
.v-list {
  height: 100%;
  overflow-y: auto;
}
</style>
