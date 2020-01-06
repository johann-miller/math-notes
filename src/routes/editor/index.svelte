<script id="MathJax-script">
	import { onMount, afterUpdate } from 'svelte'

	let input = ''
	let idleInput

	function inputChange() {
		clearTimeout(idleInput)
		idleInput = setTimeout(updateOutput, 750)
	}

	function updateOutput() {
		document.getElementById("output").innerHTML = input

		if (window.MathJax) {
			window.MathJax.Hub.Queue([
				'Typeset',
				window.MathJax.Hub,
				'output'
			])
		}
	}

	onMount(() => {
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
		}
	})
</script>

<style>
	.container {
		height: calc(100vh - 3rem);
		width: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	.editor-container {
		display: grid;
		grid-area: editor;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-template-areas:
			"input output";
		width: 100%;
		height: 100%;
	}

	.editor-input {
		border-right: 1px #d6d9dc solid;
		display: flex;
		flex-flow: column;
		grid-area: input;
	}

	.editor-output {
		grid-area: output;
	}

	#math-input {
		flex-grow: 1;
		border: none;
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
		color: inherit;
		resize: none;
		width: 100%;
		max-width: 40rem;
		padding: 1rem;
		line-height: 1.8;
	}

	#output {
		width: 100%;
		max-width: 40rem;
		padding: 1rem;
	}

	.section-area {
		display: flex;
		flex-flow: column;
		align-items: center;
		line-height: 1.8;
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
		width: 100%;
		min-height: 100%;
	}

	.section-title-bar {
		font-weight: 300;
		width: 100%;
		padding: 0 1rem;
		border-bottom: 1px #d6d9dc solid;
	}
</style>

<svelte:head>
	<title>LaTeX editor</title>
</svelte:head>

<div class="container">
	<div class="editor-container">
		<section class="editor-input section-area">
			<div class="section-title-bar">Input</div>
			<textarea id="math-input" bind:value={input} on:input={inputChange}></textarea>
		</section>
		<section class="editor-output section-area">
			<div class="section-title-bar">Preview</div>
			<article id="output"></article>
		</section>
	</div>
</div>