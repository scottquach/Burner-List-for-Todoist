<template>
  <div>
    <h1>All Tasks</h1>
    <div v-for="task in allTasks" :key="task.id">{{ task.content }}</div>
  </div>
</template>
<script>
export default {
  computed: {
    allTasks: function() {
      return this.$store.getters.allTasks;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
