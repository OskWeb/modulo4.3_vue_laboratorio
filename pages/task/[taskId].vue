<template>
  <div class="taskEditPage">
    <NuxtLink :to="'/'" class="backButton" aria-label="volver">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
    </NuxtLink>
    <EditTask :taskId="taskId" :key="taskId" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const taskId = computed(() => route.params.taskId as string);
</script>

<style>
.taskEditPage {
  position: relative;
  height: 100vh;
}
.backButton {
  border: 2px solid black;
  border-radius: 5px;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min-content;
}
.backButton svg {
  fill: black;
  width: 20px;
}
.editForm {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

@media (max-width: 600px) {
  .editForm {
    flex-direction: column;
  }
  .editForm .addTaskInput {
    width: 100%;
    box-sizing: border-box;
  }
  .editForm .editButton {
    justify-content: center;
  }
}
</style>
