<script>
    import {currentUser} from "../../store/user.js"
    import SignOut from "../../components/SignOut.svelte"

    let email, password

    function login() {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        })
    }
</script>

<style>
    .container {
        display: flex;
        flex-flow: column;
        align-items: center;
        padding-top: 5rem;
    }

    .login-form {
        display: flex;
        flex-flow: column;
        align-items: start;
    }

    .login-button {
        margin-top: 2rem;
        align-self: center;
    }

    .logged-in-message {
        margin-bottom: 2rem;
    }
</style>

<div class="container">
    <h1>Admin login</h1>
    {#if ($currentUser == null)}
        <form action="" onsubmit="event.preventDefault()" class="login-form">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value="{email}">
            <label for="password">Password</label>
            <input type="password" bind:value="{password}">
            <button type="submit" on:click="{login}" class="login-button">
                Login
            </button>
        </form>
    {:else}
        <span class="logged-in-message">You are already signed in</span>
        <SignOut />
    {/if}
</div>
