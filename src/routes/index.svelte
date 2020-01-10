<script>
    
</script>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	header {
		display: flex;
		flex-flow: column;
		align-items: center;
		margin-top: 2rem;
		padding: 1rem;
	}

	.course {
		display: grid;
		align-items: center;
		grid-template-columns: 10rem 30rem;
		grid-template-rows: repeat(2, auto);
		grid-template-areas:
			"image title"
			"image description";
		padding: 1rem;
	}

	.course > img {
		grid-area: image;
		width: 100%;
		height: auto;
	}

	.course > h2 {
		grid-area: title;
		padding-left: 1rem;
	}

	.course > p {
		grid-area: description;
		padding-left: 1rem;
	}

	.description {
		display: flex;
		flex-flow: column;
		justify-content: center;
		padding-left: 1rem;
	}

	.title {
		line-height: 1.5;
		border-bottom: 1px #d6d9dc solid;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
	}
</style>

<svelte:head>
	<title>Sigma notes</title>
</svelte:head>

<div class="container">
	<header>
		<h1 class="title">Sigma notes</h1>
		<p class="description">
			A blog for free learning material on mathematics
		</p>
	</header>

	<ul class="courses">
		<li class="course">
			<img 
			src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fa3%2FPolynomialdeg3.svg%2F1200px-Polynomialdeg3.svg.png&f=1&nofb=1" 
			alt="Course-1">
			<h2>Course 1</h2>
			<p>
				Description of course 1. Proin vel iaculis purus. Quisque massa nibh, blandit a porttitor vel, condimentum congue augue. Donec. 
			</p>
		</li>
	</ul>
</div>