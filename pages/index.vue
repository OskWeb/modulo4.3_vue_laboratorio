<script setup lang="ts">
let tasksData = ref(null);
const handleSelect = (value: any) => {
  tasksData.value = value;
};
</script>

<template>
  <div class="mainBox">
    <AddTask />
    <FilterTask @selectChanged="handleSelect" />
    <ListTasks :filterTasks="tasksData" />
  </div>
</template>

<style>
body {
  position: relative;
}
.mainBox {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  gap: 10px;
}
.icon {
  width: 20px;
  fill: #ffffff;
}

@media (max-width: 600px) {
  .mainBox {
    width: 100%;
  }
  .task {
    flex-direction: column;
  }
  .task .stateButtonBox {
    width: 100%;
  }
  .task .stateButton {
    width: 100%;
  }
  .task .actionButtonsBox {
    width: 100%;
  }
  .task .actionButtonsBox .deleteButton,
  .task .actionButtonsBox .editButton {
    flex: 1;
  }
  .addForm {
    flex-direction: column;
  }
  .addForm .addTaskInput {
    width: 100%;
    box-sizing: border-box;
  }
  .addForm .addTaskButton {
    width: 100%;
    justify-content: center;
  }
}
</style>
