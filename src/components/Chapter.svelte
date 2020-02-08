<script>
    import Section from './Section.svelte'

    export let chapter, index
</script>

<style>
    .chapter {
        width: 100%;
    }

    .chapter:not(:last-child) {
        border-bottom: 1px #d6d9dc solid;
    }

    .chapter-title {
        display: flex;
        align-items: flex-start;
        border: none;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        width: 100%;
    }

    .index {
        margin-right: 0.75rem;
    }
</style>

<li class="chapter">
    <div class="chapter-title">
        <span class="index">{index + 1}</span><span>{chapter.title}</span>
    </div>
    <ol>
        {#if chapter.sections}
            {#each chapter.sections as section, index}
                <Section section = {section} index = {index} />
            {/each}
        {/if}
    </ol>
</li>
