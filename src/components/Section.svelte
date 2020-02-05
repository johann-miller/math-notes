<script>
    export let section, index
</script>

<style>
    .index {
        margin-right: 0.75rem;
    }

    .section {
        background: #d6d7d8;
    }

    .section button {
        background: none;
        border-radius: 0;
        border: none;
        padding: 1rem 1rem 1rem 3rem;
        width: 100%
    }
</style>

<li class="section">
    <button>
        <span class="index">{index + 1}</span><span>{section.title}</span>
    </button>
</li>