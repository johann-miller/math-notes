<script>
import Navbar from '../components/Nav.svelte'

let darkMode = false

function toggleDarkMode() {
	var element = document.getElementById("body")
	
	if (darkMode) {
		element.classList.remove("dark-mode")
	} else {
		element.classList.add("dark-mode")
	}

	darkMode = !darkMode
}
</script>

<style>
	main {
		align-items: center;
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		min-width: 100%;
	}

	:global(.dark-mode) {
		background: #393939;
		color: #fcfcfc;
	}

	.toggle-theme {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}
</style>

<button class="toggle-theme" on:click={toggleDarkMode}>
Toggle theme
</button>

<Navbar />

<main>
	<slot></slot>
</main>