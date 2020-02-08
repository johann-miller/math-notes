<script>
    import { onMount } from 'svelte'
    import Course from '../../components/Course.svelte'
    import Editor from '../../components/Editor.svelte'
    import {postID, editorBody} from '../../store/post.js'

    let saving
    let body = ""
    let post = ""
    let closed = false
    let db
    let courses = [
        {
            id: "abc123",
            content: {
                title: "Algebra",
                chapters: [
                    {
                        title: "Groups",
                        sections: [
                            {
                                title: "Axioms for groups",
                                postID: "test"
                            },
                            {
                                title: "The dihedral groups",
                                postID: "test"
                            }
                        ]
                    },
                    {
                        title: "Rings",
                        sections: [
                            {
                                title: "Quotient rings",
                                postID: "test"
                            }
                        ]
                    }
                ]
            }
        },
        {
            id: "abc123",
            content: {
                title: "Analysis",
                chapters: [
                    {
                        title: "The real numbers",
                        sections: [
                            {
                                title: "Axioms",
                                postID: "test"
                            },
                            {
                                title: "The least upper bound property",
                                postID: "test"
                            }
                        ]
                    },
                    {
                        title: "Topology",
                        sections: [
                            {
                                title: "Continuous functions",
                                postID: "test"
                            }
                        ]
                    }
                ]
            }
        }
    ]

    editorBody.subscribe(value => {
        body = value
    })

    postID.subscribe(value => {
        post = value
    })

    function save() {
        saving = savePost()
    }

    async function savePost() {
        let res = await db.collection('posts').doc(post).set({
            body: body
        }, { merge: true })

        if (res.ok) {
            return true
        }
    }

    onMount(() => {
        db = firebase.firestore()
    })
</script>

<style>
    .container {
        border-top: 1px #d6d9dc solid;
        display: grid;
        grid-template-rows: 2.5rem auto;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "toolbar toolbar"
            "sidebar editor";
        width: 100%;
        height: calc(100vh - 3rem);
    }

    .editor {
        background: #fcfcfc;
        display: flex;
        flex-flow: column;
        justify-items: start;
        justify-self: stretch;
        align-items: start;
        width: 100%;
        grid-area: editor;
    }

    .sidebar {
        border-right: 1px #d6d9dc solid;
        width: 20rem;
        transition: 0.2s all ease-in-out;
        grid-area: sidebar;
    }

    .toolbar {
        display: flex;
        border-bottom: 1px #d6d9dc solid;
        grid-area: toolbar;
        width: 100vw;
    }

    .toolbar-button {
        background: none;
        border: none;
        border-radius: 0;
        border-right: 1px #d6d9dc solid;
        height: 100%;
    }

    .toolbar-button img {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 0.5rem;
        filter: invert(20%) sepia(7%) saturate(259%) hue-rotate(2deg) brightness(100%) contrast(85%);
    }
</style>

<div class="container">
    <div class="toolbar">
        <button class="toolbar-button" on:click={() => {closed = !closed}}>
            <img src="images/si-sprite.svg" alt="list">
            <span>Sections</span>
        </button>
        <button class="toolbar-button" on:click={save}>
            {#await saving}
                <img src="images/loading.svg" alt="saving">
            {/await}
            <img src="images/save.svg" alt="save">
            <span>Save</span>
        </button>
        <button class="toolbar-button">
            <img src="images/ok.svg" alt="checkmark">
            <span>Publish</span>
        </button>
    </div>
    {#if !closed}
    <div class="sidebar">
        <ul>
            {#each courses as course}
                <Course course = {course} />
            {/each}
        </ul>
    </div>
    {/if}
    <div class="editor">
        <Editor />
    </div>
</div>
