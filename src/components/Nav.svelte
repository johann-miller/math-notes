<script>
	import {currentUser} from "./../store/user.js"
	import SignOut from "./SignOut.svelte"
</script>

<style>
	a {
		font-size: 20px;
		font-weight: 400;
		transition: opacity 0.2s ease-in-out;
		opacity: 0.65;
	}

	a:hover {
		opacity: 1;
	}

	nav {
		display: flex;
		width: 100%;
		justify-content: start;
		height: 3rem;
	}

	ul {
		align-items: center;
		display: flex;
		justify-content: start;
		list-style-type: none;
		max-width: 60rem;
		margin-left: 1rem;
		width: 100%;
	}

	li {
		margin: 0 0.5rem;
	}
</style>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $currentUser}
		<li><a href="/editor">Editor</a></li>
		<li><SignOut /></li>
		{/if}
	</ul>
</nav>
