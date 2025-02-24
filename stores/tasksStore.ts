import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as TaskInfo[],
    // tasks: [{ id: 1, name: "Ir a comprar", completed: false }],
  }),

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

    changeTaskStatus(id: number, status: boolean) {
      const task = this.tasks.find((task) => task.id == id);
      if (task) {
        task.completed = status;
        this.tasks;
      }
    },
  },
});

interface TaskInfo {
  id: number;
  name: string;
  completed: boolean;
}
