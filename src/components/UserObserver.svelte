<script>
    import {currentUser} from "./../store/user.js"
    import {onMount} from 'svelte'

    onMount(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser.set(user)
            } else {
                currentUser.set(null)
            }
        })
    })
</script>