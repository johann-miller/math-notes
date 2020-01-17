<script>
	import Navbar from '../components/Nav.svelte'
	import UserObserver from '../components/UserObserver.svelte'
</script>

<style>
	
</style>

<UserObserver />
<Navbar />
<main>
	<slot></slot>
</main>