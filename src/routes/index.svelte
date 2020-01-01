<script id="MathJax-script">
	import { onMount, afterUpdate } from 'svelte'

	let input = ''

	function redrawMath() {
	}

	function updateOutput() {
		document.getElementById("output").innerHTML = input

		if (window.MathJax) {
		window.MathJax.Hub.Config({
			tex2jax: {
				inlineMath: [['$', '$'], ['(', ')']],
				displayMath: [['$$', '$$'], ['[', ']']],
				processEscapes: true,
				processEnvironments: true
			},
			displayAlign: 'center',
			'HTML-CSS': {
				styles: { '.MathJax_Display': { margin: 0 } },
				linebreaks: { automatic: true }
          },
		})
		window.MathJax.Hub.Queue([
			'Typeset',
			window.MathJax.Hub,
			'output'
		])
		}
	}
</script>

<style>
	article {
		max-width: 40rem;
	}

	h1 {
		line-height: 1.5;
		padding: 1.5rem 0 0 0;
		margin-bottom: 3rem;
		width: 100%;
		text-align: center;
	}

	.math {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>

<svelte:head>
	<title>LaTeX editor</title>
</svelte:head>

<h1>LaTeX editor</h1>

<article>
	<form class="math" action="" onsubmit="event.preventDefault()">
		<label for="math-input">Type your LaTeX</label>
		<input type="text" name="" id="math-input" bind:value={input} on:update={redrawMath}>
	</form>
	<button on:click={updateOutput}>Update</button>
	<p id="output"></p>

</article>
