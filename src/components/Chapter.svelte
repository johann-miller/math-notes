<script>
    import Section from './Section.svelte'

    export let chapter, index
</script>

<style>
    .chapter {
        background: #eeeff1;
        width: 100%;
    }

    .chapter button {
        border: none;
        background: none;
        padding: 1rem 1rem 1rem 2rem;
        width: 100%;
        border-radius: 0;
    }

    .index {
        margin-right: 0.75rem;
    }
</style>

<li class="chapter">
    <button>
        <span class="index">{index + 1}</span><span>{chapter.title}</span>
    </button>
    <ol>
        {#each chapter.sections as section, index}
            <Section section = {section} index = {index} />
        {/each}
    </ol>
</li>
