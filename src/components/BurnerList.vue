<template>
  <div class="burner-list">
    <h1>{{ header }}</h1>
    <v-list rounded color="#fafafa">
      <v-list-item-group class="burner-list__items">
        <draggable v-model="items" group="type" @change="change($event)">
          <transition-group>
            <task-item v-for="item in items" :key="item.id" :item="item"></task-item>
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
  props: {
    type: String
  },
  methods: {
    change: function(event) {
      console.log(event);
      if (event.added) {
        this.$store.dispatch("addLabelToTask", {
          task: event.element,
          burnerList: this.type
        });
      } else if (event.removed) {
        this.$store.dispatch("removeLabelFromTask", {
          task: event.element,
          burnerList: this.type
        });
      }
    }
  },
  computed: {
    header: function() {
      switch (this.type) {
        case "front":
          return "Front burner";
        case "back":
          return "Back burner";
        case "misc":
          return "Misc burner";
        default:
          console.log("burner list didn't match a type");
          return "";
      }
    },
    items: {
      get() {
        switch (this.type) {
          case "front":
            return this.$store.getters.frontBurnerTasks;
          case "back":
            return this.$store.getters.backBurnerTasks;
          case "misc":
            return this.$store.getters.miscBurnerTasks;
          default:
            console.log("burner list didn't match a type");
            return [];
        }
      },
      set(value) {
        // console.log(value);
        switch (this.type) {
          case "front":
            this.$store.commit("updateFrontBurnerTasks", value);
            break;
          case "back":
            this.$store.commit("updateBackBurnerTasks", value);
            break;
          case "misc":
            this.$store.commit("updateMiscBurnerTasks", value);
            break;
          default:
            console.log("burner list didn't match a type");
        }
      }
    }
  }
};
</script>
<style scoped>
.burner-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.burner-list__items {
  width: 15rem;
}
</style>
