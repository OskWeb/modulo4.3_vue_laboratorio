<template>
  <EditTask :taskId="taskId" :key="taskId" />
</template>

<script setup lang="ts">
const route = useRoute();
const taskId = computed(() => route.params.taskId as string);
</script>

<style>
@media (max-width: 600px) {
  .editForm {
    flex-direction: column;
  }
  .editForm .editButton {
    justify-content: center;
  }
}
</style>
