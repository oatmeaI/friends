<script>
  // TODO - break this up into components
  // TODO - typescript??
  // TODO - persist data - maybe start with localstorage, build persistence layer, then consider how to move forward
  // TODO - date helpers
  // Persist locally & allow data porting & cloud sync would be rad

  let appStore = {
    view: "all",
    selectedGoal: null
  };

  let goalStore = [
    {
      steadyDate: new Date("11/01/2019"),
      steadyOverride: false,
      name: "Quit reddit",
      relapses: 0,
      lastRelapse: null,
      bestStreak: 10,
      id: 1
    },
    {
      steadyDate: new Date("11/01/2019"),
      steadyOverride: true,
      name: "be awesome",
      relapses: 0,
      lastRelapse: null,
      bestStreak: 10,
      id: 2
    },
    {
      steadyDate: new Date("08/01/2019"),
      steadyOverride: false,
      name: "be awesome steadily",
      relapses: 0,
      lastRelapse: null,
      bestStreak: 10,
      id: 3
    }
  ];

  let inputState = {
    steadyDate: "",
    name: "",
    steadyOverride: false
  };

  let nameInput, steadyInput, steadyDateInput, editNameInput;

  const relapseGoal = goal => {
    const today = new Date();
    const index = goalStore.findIndex(
      currentGoal => currentGoal.id === goal.id
    );
    goalStore[index] = {
      ...goalStore[index],
      relapses: goalStore[index] + 1,
      steadyOverride: false,
      steadyDate: new Date(today.setTime(today.getTime() + 7 * 86400000)),
      lastRelapse: new Date()
    };
  };

  const deleteGoal = goal => {
    goalStore = goalStore.filter(currentGoal => currentGoal !== goal);
  };

  const editGoal = goal => {
    appStore = {
      ...appStore,
      view: "edit",
      selectedGoal: goal.id
    };
  };

  const saveGoal = goal => {
    const index = goalStore.findIndex(
      goal => goal.id === appStore.selectedGoal
    );
    goalStore[index] = {
      ...goalStore[index],
      name: editNameInput.value
    };
    editNameInput.value = "";
    seeMain();
  };

  const seeMain = () => {
    appStore = {
      ...appStore,
      view: "all",
      selectedGoal: null
    };
  };

  const goSteady = goal => {
    const index = goalStore.indexOf(goal);
    goalStore[index] = {
      ...goalStore[index],
      steadyOverride: true
    };
  };

  const goActive = goal => {
    const today = new Date();
    const index = goalStore.indexOf(goal);
    goalStore[index] = {
      ...goalStore[index],
      steadyOverride: false,
      steadyDate: new Date(today.setTime(today.getTime() + 7 * 86400000))
    };
  };

  const createGoal = () => {
    const today = new Date();
    const newGoal = {
      steadyDate: new Date(
        inputState.steadyDate || today.setTime(today.getTime() + 7 * 86400000)
      ),
      steadyOverride: inputState.steady || false,
      name: inputState.name,
      relapses: 0,
      lastRelapse: null,
      bestStreak: 0,
      id: btoa(Math.random()).substring(0, 12)
    };
    goalStore = [...goalStore, newGoal];
    console.log(goalStore);
    nameInput.value = "";
    steadyInput.value = false;
    steadyDateInput.value = "";
  };

  const seeDetails = goal => {
    appStore = {
      ...appStore,
      view: "detail",
      selectedGoal: goal.id
    };
  };
  const today = new Date();
  let allGoals, activeGoals, steadyGoals, selectedGoal;

  $: {
    activeGoals = goalStore.filter(
      goal => !goal.steadyOverride && goal.steadyDate > today
    );
    steadyGoals = goalStore.filter(
      goal => goal.steadyOverride || goal.steadyDate < new Date()
    );
    selectedGoal = goalStore.find(goal => goal.id === appStore.selectedGoal);
  }
</script>

{#if appStore.view === 'all'}
  <input type="text" bind:this={nameInput} bind:value={inputState.name} />
  <input
    type="checkbox"
    bind:this={steadyInput}
    bind:value={inputState.steadyOverride} />
  <input
    type="text"
    bind:this={steadyDateInput}
    bind:value={inputState.steadyDate} />
  <button on:click={() => createGoal()}>Add</button>

  <h1>Active Goals</h1>
  {#each activeGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    Steady at: {goal.steadyDate.toLocaleDateString()}
    <button on:click={() => relapseGoal(goal)}>Relapse</button>
    <button on:click={() => editGoal(goal)}>Revise</button>
    <button on:click={() => deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goSteady(goal)}>Go Steady</button>
    <button on:click={() => seeDetails(goal)}>See Details</button>
  {/each}

  <h1>Steady Goals</h1>
  {#each steadyGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    <button on:click={() => relapseGoal(goal)}>Relapse</button>
    <button on:click={() => editGoal(goal)}>Revise</button>
    <button on:click={() => deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goActive(goal)}>Go Active</button>
    <button on:click={() => seeDetails(goal)}>See Details</button>
  {/each}
{:else if appStore.view === 'edit'}
  <input type="text" bind:this={editNameInput} value={selectedGoal.name} />
  <button on:click={saveGoal}>Save</button>
{:else if appStore.view === 'detail'}
  <h1>{selectedGoal.name}</h1>
  <button on:click={seeMain}>Back</button>
{/if}
