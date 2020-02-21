<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    export let title = ""

    function action(value) {
        switch(value) {
            case "confirm":
                dispatch('confirm')
                break
            case "cancel":
                dispatch('cancel')
        }
    }

</script>

<style>
    .container {
        background: rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    .confirmation-card {
        border-radius: 0.3rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        background: #FFFCF8;
        padding: 2rem;
        z-index: 1;
    }

    .buttons {
        display: flex;
        margin-top: 1.5rem;
    }

    .buttons > button:not(:first-child) {
        margin-left: 1rem;
    }
</style>

<div class="container">
    <div class="confirmation-card">
        <span>Delete {title}?</span>
        <div class="buttons">
            <button on:click={() => {action("cancel")}}>Cancel</button>
            <button on:click={() => {action("confirm")}}>Delete</button>
        </div>
    </div>
</div>