<script>
    let courses = [
		{name: 'Arithmetic & pre-algebra'},
		{name: 'Trigonometry'},
		{name: 'Algebra'},
		{name: 'Probability'},
		{name: 'Calculus'},
		{name: 'Linear algebra'},
		{name: 'Higher math & logic'},
		{name: 'Group theory'},
	]
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
		margin: 2rem 0;
		padding: 1rem;
	}

	.courses {
		display: grid;
		grid-auto-flow: row;
		grid-gap: 1.5rem;
		grid-template-columns: repeat(2, auto);
		list-style-type: none;
		margin-bottom: 3rem;
	}

	.course {
		display: flexbox;
		flex-flow: column;
		padding-bottom: 1rem;
		width: 30rem;
		max-width: 100%;
		border-bottom: 1px #d6d9dc solid;
	}

	.course > img {
		width: 100%;
		height: auto;
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
	<title>Johann Miller / Blog</title>
</svelte:head>

<div class="container">
	<header>
		<h1 class="title">Johann Miller / Blog</h1>
		<p class="description">
			A collection of free learning materials on mathematics
		</p>
	</header>

	<ul class="courses">
		{#each courses as course}
		<li class="course">
			<img src="https://via.placeholder.com/800x300.webp?text=Course+image" alt="Course-1">
			<h2>{course.name}</h2>
			<p>
				Description of {course.name}. Proin vel iaculis purus. Quisque massa nibh, blandit a porttitor vel, condimentum congue augue. Donec. 
			</p>
		</li>
		{/each}
	</ul>
</div>