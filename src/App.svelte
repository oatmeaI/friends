<script>
    import Main from './views/Main.svelte';
    import Edit from './views/Edit.svelte';
    import Detail from './views/Detail.svelte';
    import { state as appStore } from './stores/app.ts';
    import { friends as friendStore } from './stores/friends.ts';

    let appState, selectedFriend, friendState;
    appStore.subscribe(state => (appState = state));
    friendStore.subscribe(state => (friendState = state));

    $: {
        selectedFriend = appState.selectedFriend ? friendState[appState.selectedFriend] : null;
    }
</script>

<style>
    main {
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        background: #eeeeee;
        min-height: 98%;
        padding: 10px 15px;
    }

    :global(body) {
        font-family: Monaco;
        font-size: 14px;
    }

    h1 {
        margin: auto;
        text-align: center;
        margin-bottom: 15px;
    }
</style>

<main>
    <h1>Friendly</h1>
    {#if appState.view === 'all'}
        <Main friend={selectedFriend} />
    {:else if appState.view === 'edit'}
        <Edit friend={selectedFriend} />
    {:else if appState.view === 'detail'}
        <Detail friend={selectedFriend} />
    {/if}
</main>
