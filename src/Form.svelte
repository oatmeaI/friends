<script>
  import goals from "./goals.ts";

  let inputState = {
    name: "",
    steadyOverride: false
  };

  let nameInput, steadyInput;

  const onSubmit = () => {
    goals.createGoal({
      steady: inputState.steadyOverride,
      name: inputState.name
    });

    nameInput.value = "";
    steadyInput.value = false;
  };
</script>

<input type="text" bind:this={nameInput} bind:value={inputState.name} />
<input
  type="checkbox"
  bind:this={steadyInput}
  bind:value={inputState.steadyOverride} />
<button on:click={onSubmit}>Add</button>
