<script>
    import { onMount } from 'svelte'
    import Course from '../../components/Course.svelte'

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
        }
    ]

    onMount(() => {
        db = firebase.firestore()
    })
</script>

<style>
    .container {
        border-top: 1px #d6d9dc solid;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 20rem auto;
        width: 100%;
        height: calc(100vh - 3rem);
    }

    .editor {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .sidebar {
        border-right: 1px #d6d9dc solid;
        width: 100%;
    }
</style>

<div class="container">
    <div class="sidebar">
        <ul>
            {#each courses as course}
                <Course course = {course} />
            {/each}
        </ul>
    </div>
    <div class="editor">
        <span>Select a section to edit</span>
    </div>
</div>

