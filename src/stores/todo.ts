import { writable } from "svelte/store";

function createTodo() {
  const { subscribe, update } = writable([
    {
      task: "Learn Svelte",
      id: "1",
      done: false,
    },
    {
      task: "Create a To-do app",
      id: "2",
      done: false,
    },
  ]);

  function addTask(task: string) {
    const id = Math.random().toString(36).slice(2, 9);
    update((tasks) => [...tasks, { task, id, done: false }]);
  }

  function removeTask(id: string) {
    update((tasks) => {
      return tasks.filter((t) => t.id !== id);
    });
  }

  function toggleTask(id: string) {
    update((tasks) =>
      tasks.map((t) => {
        if (t.id == id) {
          return { ...t, done: !t.done };
        }
        return t;
      })
    );
  }

  return { subscribe, addTask, removeTask, toggleTask };
}

export default createTodo();
