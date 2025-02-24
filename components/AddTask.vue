<template>
  <h2>Add task</h2>
  <form @submit.prevent="handleNewTask">
    <input v-model="name" class="addTaskInput" />
    <button type="submit" class="addTaskButton">Agregar</button>
  </form>
</template>

<style>
form {
  display: flex;
  gap: 20px;
}
.addTaskInput {
  padding: 10px;
}
.addTaskButton {
  width: 100px;
  padding: 10px;
  border: none;
  background-color: rgb(0, 102, 255);
  color: white;
}
</style>

<script setup lang="ts">
import { useTasksStore } from "@/stores/tasksStore";

import { ref } from "vue";

const store = useTasksStore();
const { addTask } = store;

const name = ref("");

watch(name, (newValue) => {
  console.log(newValue);
});

const handleNewTask = () => {
  if (name.value.trim() !== "") addTask(name.value);
  name.value = "";
};
</script>
