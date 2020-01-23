<script>
	import Navbar from '../components/Nav.svelte'
	import UserObserver from '../components/UserObserver.svelte'
</script>

<style>
	main {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>

<UserObserver />
<Navbar />
<main>
	<slot></slot>
</main>