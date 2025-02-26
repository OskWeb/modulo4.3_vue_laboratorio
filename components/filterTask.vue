<template>
  <v-select
    class="select"
    v-model="selected"
    :options="options"
    @update:modelValue="handleSelect"
  />
</template>

<script setup lang="ts">
const selected = ref("Todas");
const options = ref(["Todas", "Completadas", "Pendientes"]);
import { useTasksStore } from "@/stores/tasksStore";
const store = useTasksStore();

const emit = defineEmits<{
  (e: "selectChanged", value: any): void;
}>();
const handleSelect = (value: string) => {
  let tasks = null;
  let filterBy = "";
  switch (value) {
    case "Todas":
      filterBy = "todas";
      tasks = store.filterByAll;
      break;
    case "Completadas":
      filterBy = "completadas";
      tasks = store.filterByCompleted;
      break;
    case "Pendientes":
      filterBy = "pendientes";
      tasks = store.filterByPending;
      break;
  }
  let data = [tasks, filterBy];
  console.log(tasks);
  emit("selectChanged", data);
};
</script>

<style>
.vs__clear {
  display: none;
}
.v-select {
  max-width: 600px;
}
</style>
