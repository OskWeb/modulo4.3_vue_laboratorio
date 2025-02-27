<template>
  <div>
    <h2>Add task</h2>
    <form @submit.prevent="handleNewTask" class="addForm">
      <input v-model="name" class="addTaskInput" />
      <button type="submit" class="addTaskButton button" aria-label="add task">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
          />
        </svg>
        Agregar
      </button>
    </form>
    <AlertSaved
      message="Tarea creada con exito"
      :visibility="alertVisible"
      alertType="alertSuccess"
    />
  </div>
</template>

<style>
.addForm {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
.addTaskInput {
  padding: 10px;
  width: 300px;
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
const alertVisible = ref(false);

const handleNewTask = () => {
  if (name.value.trim() !== "") {
    addTask(name.value);
    alertVisible.value = true;
    setTimeout(() => {
      alertVisible.value = false;
    }, 5000);
  }
  name.value = "";
};
</script>
