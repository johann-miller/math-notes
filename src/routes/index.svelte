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
	h1 {
		line-height: 1.5;
		padding: 1.5rem 0 0 0;
		margin-bottom: 3rem;
		width: 100%;
		text-align: center;
	}

	.container {
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	.editor-container {
		display: grid;
		flex-grow: 1;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		grid-template-areas:
			"input output";
		width: 100%;
		min-height: 100%;
	}

	.editor-input {
		grid-area: input;
	}

	.editor-output {
		grid-area: output;
		padding: 1rem;
	}

	.math {
		display: flex;
		flex-flow: column;
		align-items: center;
		height: 100%;
	}

	#math-input {
		background: inherit;
		border: none;
		border-right: 1px #747474 solid;
		font-family: 'Robot', sans-serif;
		font-size: 18px;
		color: inherit;
		padding: 1rem;
		resize: vertical;
		height: 100%;
		width: 100%;
	}

	.section-area {
		width: 100%;
		min-height: 100%;
	}
</style>

<svelte:head>
	<title>LaTeX editor</title>
</svelte:head>

<div class="container">
<h1>LaTeX editor</h1>
<button on:click={updateOutput}>Update</button>
<div class="editor-container">
	<section class="editor-input section-area">
		<form class="math" action="" onsubmit="event.preventDefault()">
			<textarea id="math-input" bind:value={input}></textarea>
		</form>
	</section>
	<section class="editor-output section-area" id="output">
		
	</section>
</div>
</div>

