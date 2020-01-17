<script>
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
</style>

<div class="container">
    <h1>Admin login</h1>
    <form action="" onsubmit="event.preventDefault()" class="login-form">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value="{email}">
        <label for="password">Password</label>
        <input type="password" bind:value="{password}">
        <button type="submit" on:click="{login}">
            Login
        </button>
    </form>
</div>
