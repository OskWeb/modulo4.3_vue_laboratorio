<template>
  <div class="tasksListBox">
    <ul class="tasksList" v-if="tasks.length > 0">
      <div class="tasksHeader">
        <h2>Lista de tareas</h2>
        <div class="globalOptions">
          <button @click="handleChangeAllTasksStatus" class="changeAllStates">
            Cambiar estados
          </button>
          <button @click="handleDeleteAllTasks" class="deleteAllTasks">
            Borrar tareas
          </button>
        </div>
      </div>
      <li v-for="task in tasks" class="task" :key="task.id">
        <div class="stateButtonBox">
          <button
            @click="handleChangeTaskStatus(task.id, !task.completed)"
            class="stateButton"
          >
            <span v-if="task.completed">Pendiente</span>
            <span v-else>Completada</span>
          </button>
        </div>

        <div class="nameBox" :class="{ completed: task.completed }">
          <span>
            {{ task.name }}
          </span>
        </div>
        <div class="actionButtonsBox">
          <button
            @click="handlerDelete(task.id)"
            class="deleteButton button"
            aria-label="delete task"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
            Eliminar
          </button>
          <NuxtLink
            :to="`/task/${task.id}`"
            class="editButton button"
            aria-label="edit task"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
              />
            </svg>
            Editar
          </NuxtLink>
        </div>
      </li>
    </ul>
    <div v-else class="tasksListEmpty">
      <span> No tienes ninguna tarea actualmente </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="emptyListIcon"
      >
        <path
          d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
    </div>
  </div>
  <AlertSaved
    message="Se han eliminado todas las tareas"
    :visibility="alertVisibleDeleteAll"
    alertType="alertDelete"
  />
  <AlertSaved
    message="Se ha eliminado la tarea"
    :visibility="alertVisibleDeleteOne"
    alertType="alertDelete"
  />
  <!-- </div> -->
</template>
<script setup lang="ts">
import { useTasksStore } from "@/stores/tasksStore";
const store = useTasksStore();

const tasks = ref(store.tasks);

const props = defineProps<{
  filterTasks?: any;
}>();

watch(
  () => props.filterTasks,
  (value) => {
    tasks.value = value[0];
  }
);

const alertVisibleDeleteAll = ref(false);
const alertVisibleDeleteOne = ref(false);

const handlerDelete = (id: number) => {
  store.deleteTask(id);
  alertVisibleDeleteOne.value = true;
  setTimeout(() => {
    alertVisibleDeleteOne.value = false;
  }, 5000);
  filterAfterUpdate();
};
const filterAfterUpdate = () => {
  const defaultFilter = "todas";
  if (props.filterTasks) {
    switchFilter(props.filterTasks[1]);
  } else {
    switchFilter(defaultFilter);
  }
};
const switchFilter = (value: string) => {
  switch (value) {
    case "todas": {
      console.log("todas");
      tasks.value = store.filterByAll;
      break;
    }
    case "completadas": {
      console.log("completadas");
      tasks.value = store.filterByCompleted;
      break;
    }
    case "pendientes": {
      console.log("pendientes");
      tasks.value = store.filterByPending;
      break;
    }
    default: {
      tasks.value = store.tasks;
    }
  }
};

const name = ref();

const handleChangeTaskStatus = (id: number, status: boolean) => {
  store.changeTaskStatus(id, status);
};

const handleChangeAllTasksStatus = () => {
  store.changeAllTasksStatus();
};

const handleDeleteAllTasks = () => {
  store.deleteAllTask();
  tasks.value = store.tasks;
  alertVisibleDeleteAll.value = true;
  setTimeout(() => {
    alertVisibleDeleteAll.value = false;
  }, 5000);
};
</script>
<style>
.tasksHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.globalOptions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.globalOptions button {
  padding: 10px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  height: 40px;
}
.globalOptions .changeAllStates {
  background-color: orange;
}
.globalOptions .deleteAllTasks {
  background-color: red;
}
.tasksListEmpty {
  max-width: 600px;
  height: 300px;
  background-color: rgb(0, 102, 255);
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.emptyListIcon {
  fill: #ffffff;
  width: 50px;
}

.tasksListBox {
  max-width: 600px;
}
.tasksList {
  padding: 0;
}
.task {
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
}
.tasksList .stateButtonBox {
  width: 150px;
}
.tasksList .nameBox {
  flex: 1;
  display: flex;
}
.tasksList .completed {
  text-decoration: line-through;
}
.tasksList .actionButtonsBox {
  width: 200px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.stateButton,
.deleteButton,
.editButton {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}
.stateButton {
  background-color: rgb(175, 171, 171);
}
.deleteButton {
  background-color: red;
}
.editButton {
  background-color: orange;
}
.task .name {
  text-align: start;
  flex: 1 1 auto;
  padding-left: 15px;
}
.editTaskInput {
  padding: 10px;
  border: none;
}
</style>
