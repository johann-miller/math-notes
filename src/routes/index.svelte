<script id="MathJax-script">
	import { onMount, afterUpdate } from 'svelte'

	function tex(string) {
		string = `{` + string + `}`
		return string
	}

	function redrawMath() {
		let script = document.createElement('script')
    	script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
    	document.head.append(script)
		
		script.onload = () => {
			MathJax = {
				tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
				svg: {fontCache: 'global'}
			}
		}
	}
	
	onMount(() => {
		redrawMath()
	})

	afterUpdate(() => {
		redrawMath()
	})
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
	
	p {
		margin: 1rem 0;
	}
</style>

<svelte:head>
	<title>LaTeX editor</title>
</svelte:head>

<h1>LaTeX editor</h1>

<article contenteditable="true">
Test
</article>
