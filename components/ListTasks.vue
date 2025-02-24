<template>
  <h2>Lista de tareas</h2>
  <div class="tasksListBox">
    <div class="header">
      <span class="stateLabel">Estado</span>
      <span class="nameLabel">Nombre</span>
      <span class="actionsLabel">Acciones</span>
    </div>
    <ul class="tasksList">
      <li v-for="task in store.tasks" class="task">
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
          <button @click="handlerDelete(task.id)" class="deleteButton">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.tasksListBox {
  max-width: 600px;
}
.header {
  display: flex;

  padding: 10px;
  border: 1px solid gray;
}

.header .stateLabel {
  width: 150px;
}
.header .nameLabel {
  flex: 1 1 auto;
}
.header .actionsLabel {
  width: 200px;
}
.tasksList {
  padding: 0;
}
.task {
  list-style: none;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
}
.tasksList .stateButtonBox {
  width: 150px;
}
.tasksList .nameBox {
  flex: 1 1 auto;
}
.tasksList .completed {
  text-decoration: line-through;
}
.tasksList .actionButtonsBox {
  width: 200px;
}
.stateButton,
.deleteButton {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.stateButton {
  background-color: orange;
}
.deleteButton {
  background-color: red;
}
.task .name {
  text-align: start;
  flex: 1 1 auto;
  padding-left: 15px;
}
</style>

<script setup lang="ts">
import { useTasksStore } from "@/stores/tasksStore";

const store = useTasksStore();

const handlerDelete = (id: number) => {
  store.deleteTask(id);
};

const handleChangeTaskStatus = (id: number, status: boolean) => {
  store.changeTaskStatus(id, status);
};
</script>
