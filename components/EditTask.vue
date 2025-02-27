<template>
  <h2>Edit task</h2>
  <form @submit.prevent="handleEditTask" class="editForm">
    <input v-model="name" class="addTaskInput" />
    <button type="submit" class="editButton button" aria-label="add task">
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
        />
      </svg>
      Guardar cambios
    </button>
  </form>
  <AlertSaved
    message="Se han guardado los cambios"
    :visibility="alertVisible"
    alertType="alertSuccess"
  />
</template>

<script setup lang="ts">
import { useTasksStore } from "@/stores/tasksStore";
import { ref } from "vue";

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});
const { taskId } = props;

const store = useTasksStore();

const name = ref("");
const alertVisible = ref(false);

onMounted(async () => {
  const task = store.getTaskById(Number(taskId));
  if (task) {
    name.value = task.name;
  }
});

const handleEditTask = () => {
  if (name.value.trim() !== "") {
    store.changeTaskName(Number(taskId), name.value);
    alertVisible.value = true;
    setTimeout(() => {
      alertVisible.value = false;
    }, 5000);
  }
};
</script>

<style></style>
