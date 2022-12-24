<script lang="ts">
  import todo from "./stores/todo";

  let taskInput: string;

  $: tasks = $todo.sort((a, b) => +a.done - +b.done);

  const handleAddTask = () => {
    if (taskInput) {
      todo.addTask(taskInput);
      taskInput = "";
    }
  };
</script>

<main>
  
  <div class="task-list">
    <h2>To-do List</h2>

    <form class="task-input">
      <input type="text" bind:value={taskInput} placeholder="Insert a new task..." />
      <button on:click|preventDefault={handleAddTask}>Add</button>
    </form>

    {#if tasks.length === 0}
      <p>No tasks yet!</p>
    {/if}
      
    <ul class="no-padding">
      {#each tasks as item}
        <li class="task">
          <div>
            <div class="task-name" class:done={item.done}>{item.task}</div>
            <div class="task-actions">
              <button on:click={() => todo.removeTask(item.id)}>Remove</button>
              <button on:click={() => todo.toggleTask(item.id)}>{ item.done ? "Turn back" : "Done!" }</button>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    
    <p>
      This is my first project written in Svelte to GitHub. It is a simple Todo list app that uses custom stores to manage the state of the app.
      To this point, managing state with Svelte is a lot easier than with React. I'm still learning, but I'm loving it! {"<"}3
    </p>
  </div>
</main>

<style> 
  .no-padding {
    padding: 0;
    margin-top: 2rem;
  }

  .task-list {
    width: 400px;
    max-width: 480px;
    display: flex;
    flex-direction: column;
  }

  .task-input {
    display: flex;
    justify-content: space-between;
    column-gap: .75rem;
  }

  .task-input input {
    width: 100%;
    padding: 0 .75rem;
    border: 0;
    border-radius: 4px;
    outline: none;
  }

  .task {
    list-style-type: none;
  }

  .task-name {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .task-name.done {
    text-decoration: line-through;
    color: #999;
  }

  .task-actions {
    display: flex;
    flex-wrap: nowrap;
    column-gap: .25rem;
  }

  .task > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task + .task {
    margin-top: 1rem;
  }
</style>
