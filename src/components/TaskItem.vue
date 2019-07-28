<template>
  <!-- <div> -->
  <v-list-item class="item">
    <v-list-item-icon>
      <div :style="priority"></div>
    </v-list-item-icon>
    <div>{{ item.content }}</div>
  </v-list-item>
  <!-- <v-divider></v-divider> -->
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    item: {}
  },
  computed: {
    priority: function() {
      let style = {
        "margin-right": "0.25rem",
        height: "10px",
        width: "10px",
        "background-color": "#bbb",
        "border-radius": "50%",
        display: "inline-block"
      };
      switch (this.item.priority) {
        case 1:
          // style["background-color"] = "black"
          return style;
        case 2:
          style["background-color"] = "#4073d6";

          return style;
        case 3:
          style["background-color"] = "#f49c18";

          return style;
        case 4:
          style["background-color"] = "#de4c4a";

          return style;
        default:
          console.log("Priority doesn't match a case");
      }
    }
  }
};
</script>
<style scoped>
.item {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem;
  border-color: black;
  border-width: 5px;
  text-align: start;
  max-width: 100%;
}

.dot {
  margin-right: 0.25rem;
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>
