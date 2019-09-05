<script>
  // TODO - reactions aren't working because goals are stored in an object, blah blah. need to use the "store" crap
  // TODO - persist data - maybe start with localstorage, build persistence layer, then consider how to move forward
  // Persist locally & allow data porting & cloud sync would be rad
  import Form from "./Form.svelte";
  import goals from "./goals.ts";
  import app from "./app.ts";

  let inputState = {
    steadyDate: "",
    name: "",
    steadyOverride: false
  };

  let nameInput, steadyInput, steadyDateInput, editNameInput;

  let allGoals, activeGoals, steadyGoals, selectedGoal;

  $: {
    console.log(goals.goals);
    activeGoals = goals.goals.filter(
      goal => !goal.steadyOverride && goal.steadyDate > today
    );
    steadyGoals = goals.goals.filter(
      goal => goal.steadyOverride || goal.steadyDate < today
    );
    selectedGoal = goals.goals.find(goal => goal.id === appStore.selectedGoal);
  }
</script>

{#if app.state.view === 'all'}
  <Form />
  <h1>Active Goals</h1>
  {#each activeGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    Steady at: {goal.steadyDate.toLocaleDateString()}
    <button on:click={() => goals.resetGoal(goal)}>Relapse</button>
    <button on:click={() => goals.editGoal(goal)}>Revise</button>
    <button on:click={() => goals.deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goals.goSteady(goal)}>Go Steady</button>
    <button on:click={() => app.seeDetails(goal)}>See Details</button>
  {/each}

  <h1>Steady Goals</h1>
  {#each steadyGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    <button on:click={() => goals.resetGoal(goal)}>Relapse</button>
    <button on:click={() => goals.editGoal(goal)}>Revise</button>
    <button on:click={() => goals.deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goals.goActive(goal)}>Go Active</button>
    <button on:click={() => app.seeDetails(goal)}>See Details</button>
  {/each}
{:else if app.state.view === 'edit'}
  <input type="text" bind:this={editNameInput} value={selectedGoal.name} />
  <button on:click={saveGoal}>Save</button>
{:else if app.state.view === 'detail'}
  <h1>{selectedGoal.name}</h1>
  <button on:click={app.seeMain}>Back</button>
{/if}
