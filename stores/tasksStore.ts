import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as TaskInfo[],
  }),
  persist: true,

  getters: {
    filterByCompleted: (state) => {
      return state.tasks.filter((task) => task.completed == true);
    },
    filterByPending: (state) => {
      return state.tasks.filter((task) => task.completed == false);
    },
    filterByAll: (state) => {
      return state.tasks;
    },
  },

  actions: {
    addTask(name: string) {
      const task = {
        id: this.tasks.length + 1,
        name,
        completed: false,
      };
      this.tasks.push(task);
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    deleteAllTask() {
      this.tasks = [];
    },

    changeTaskStatus(id: number, status: boolean) {
      const task = this.tasks.find((task) => task.id == id);
      if (task) {
        task.completed = status;
        this.tasks;
      }
    },
    changeAllTasksStatus() {
      this.tasks.map((task) => {
        task.completed = !task.completed;
      });
    },

    changeTaskName(id: number, name: string) {
      const task = this.tasks.find((task) => task.id == id);
      if (task) {
        task.name = name;
      }
    },

    getTaskById(id: number) {
      return this.tasks.find((task) => task.id == id);
    },
  },
});

interface TaskInfo {
  id: number;
  name: string;
  completed: boolean;
}
