<script>
    import { actions as appActions } from '../stores/app.ts';
    import { actions as friendActions } from '../stores/friends.ts';
    import Form from '../components/Form.svelte';
    export let friend;

    const onSubmit = () => {
        friendActions.updateFriend(friend);
        appActions.seeMain();
    };

    const onCancel = () => appActions.seeMain();
</script>

<style>
    section {
        width: 35%;
        margin: auto;
    }
</style>

<section>
    <h1>Edit Friend</h1>
    <Form {friend} {onSubmit} {onCancel} />
</section>
