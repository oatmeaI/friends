<script>
    import { actions as appActions } from '../stores/app.ts';
    export let selectedGoal;
</script>

<h1>{selectedGoal.name}</h1>
<button on:click={appActions.seeMain}>Back</button>
