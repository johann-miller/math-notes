<script>
    import {postID} from "./../store/post.js"

    export let section, index

    function selectSection() {
        postID.set(section.postID)
    }
</script>

<style>
    .index {
        margin-right: 0.75rem;
    }

    .section button {
        display: flex;
        align-items: flex-start;
        background: none;
        border-radius: 0;
        border: none;
        padding: 1rem 1rem 1rem 3rem;
        width: 100%
    }

    .title {
        text-align: left;
    }
</style>

<li class="section">
    <button on:click={selectSection}>
        <span class="index">{index + 1}</span><span class="title">{section.title}</span>
    </button>
</li>