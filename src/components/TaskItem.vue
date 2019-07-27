<template>
  <div class="item">
    <div>{{ item.content }}</div>
  </div>
</template>
<script>
export default {
  props: {
    item: {}
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
}
</style>
