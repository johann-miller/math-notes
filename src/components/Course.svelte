<script>
    import Chapter from "./Chapter.svelte"
    export let course
</script>

<style>
    .chapter {
        width: 100%;
        border-bottom: 1px #d6d9dc solid;
    }

    .chapter-title {
        background: none;
        border: none;
        border-radius: 0;
        padding: 1rem;
        width: 100%;
    }

    .chapters {
        background: #eeeff1;
    }
</style>

<li class="chapter">
    <button class="chapter-title">
        <span>{course.content.title}</span>
    </button>
    <ol class="chapters">
        {#each course.content.chapters as chapter, index}
            <Chapter chapter = {chapter} index = {index} />
        {/each}
    </ol>
</li>