<script>
    import Chapter from "./Chapter.svelte"

    export let course
    let expand = true
</script>

<style>
    .chapter {
        width: 100%;
        border-bottom: 1px #d6d9dc solid;
    }

    .course-title {
        display: flex;
        justify-content: space-between;
        background: none;
        border: none;
        border-radius: 0;
        padding: 1rem;
        width: 100%;
    }

    .course-title img {
        width: 1.5rem;
        height: 1.5rem;
        filter: invert(20%) sepia(7%) saturate(259%) hue-rotate(2deg) brightness(100%) contrast(85%);
        transition: 0.1s transform ease-in-out;
    }

    .chapters {
        background: #eeeff1;
    }

    .expand {
        transform: rotate(90deg);
    }
</style>

<li class="chapter">
    <button class="course-title" on:click={() => {expand = !expand}}>
        <span>{course.content.title}</span>
        <img src="images/arrow-right.svg" alt="arrow" class:expand>
    </button>
    {#if expand}
        <ol class="chapters">
            {#each course.content.chapters as chapter, index}
                <Chapter chapter = {chapter} index = {index} />
            {/each}
        </ol>
    {/if}
</li>