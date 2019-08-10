<template>
  <div class="burner-list">
    <h1 class="burner-list__header">{{ header }}</h1>
    <v-list rounded color="#fafafa">
      <v-list-item-group class="burner-list__items">
        <draggable
          v-model="items"
          :emptyInsertThreshold="100"
          group="type"
          @change="change($event)"
        >
          <transition-group>
            <task-item v-for="item in items" :key="item.id" :item="item"></task-item>
          </transition-group>
        </draggable>
      </v-list-item-group>
    </v-list>
    <img class="icon--md" v-if="items.length === 0" src="@/assets/empty-box.svg" />
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
      // console.log(event);
      if (event.added) {
        this.$store.dispatch("switchBurnerLabel", {
          task: event.added.element,
          burnerList: this.type
        });
      }
    }
  },
  computed: {
    header: function() {
      switch (this.type) {
        case "Front_Burner":
          return "Front burner";
        case "Back_Burner":
          return "Back burner";
        case "Misc_Burner":
          return "Misc burner";
        default:
          console.log("burner list didn't match a type");
          return "";
      }
    },
    items: {
      get() {
        switch (this.type) {
          case "Front_Burner":
            return this.$store.getters.frontBurnerTasks;
          case "Back_Burner":
            return this.$store.getters.backBurnerTasks;
          case "Misc_Burner":
            return this.$store.getters.miscBurnerTasks;
          default:
            console.log("burner list didn't match a type");
            return [];
        }
      },
      set(value) {
        // console.log(value);
        switch (this.type) {
          case "Front_Burner":
            this.$store.commit("updateFrontBurnerTasks", value);
            break;
          case "Back_Burner":
            this.$store.commit("updateBackBurnerTasks", value);
            break;
          case "Misc_Burner":
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

.burner-list__header {
  /* background-color: #9ec0e6; */
}

.burner-list__items {
  width: 15rem;
  min-height: 5rem;
}
</style>
