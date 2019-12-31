<script id="MathJax-script">
	import { onMount, afterUpdate } from 'svelte'

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
	h1 {
		line-height: 1.5;
		padding: 1.5rem 0 0 0;
		width: 100%;
		text-align: center;
	}
</style>

<svelte:head>
	<title>Math notes</title>
</svelte:head>

<h1>Math notes</h1>

<p>$$x = y$$</p>
