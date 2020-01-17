<script>
    function signOut() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}).catch(function(error) {
			// An error happened.
		})
	}
</script>

<button on:click="{signOut}">Sign out</button>