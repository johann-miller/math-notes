<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { fade } from 'svelte/transition'

    export let type = "course"
    export let course, chapter
    const dispatch = createEventDispatcher()
    let input = ""
    let db

    function cancel() {
        dispatch('cancel')
    }

    function create() {
        let title = input
        let docRef = db.collection("courses").doc(course)
        let chapters, sections = []

        switch(type) {
            case 'course':
                db.collection("courses").add({
                    title: title
                })
                .then(() => {dispatch('update')})
                break
            case 'chapter':
                docRef.get().then(doc => {
                    let data = doc.data()

                    if (data.chapters) {
                        chapters = data.chapters
                    } 

                    chapters.push({title: title})
                    
                    docRef.set({chapters: chapters}, {merge: true}).then(() => {
                        dispatch('update')
                    })
                })
                break
            case 'section':
                docRef.get().then(doc => {
                    let data = doc.data()

                    chapters = data.chapters

                    if (chapters[chapter].sections) {
                        sections = chapters[chapter].sections
                    }

                    sections.push({title: title})
                    chapters[chapter].sections = sections

                    docRef.set({chapters: chapters}, {merge: true}).then(() => {
                        dispatch('update')
                    })
                })
        }
    }

    onMount(() => {
        db = firebase.firestore()
    })
</script>

<style>
    .buttons {
        display: flex;
        margin-top: 2rem;
    }

    .buttons > button:not(:first-child) {
        margin-left: 2rem;
    }

    .card {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background: #fcfcfc;
        padding: 3rem 2rem;
        width: 25rem;
        border-radius: 0.5rem;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
    }

    .creation-form {
        margin-top: 1rem;
        display: flex;
        align-items: flex-start;
        flex-flow: column;
    }
</style>

<div class="container" transition:fade="{{ duration: 100 }}">
    <div class="card">
        <h2 class="title">Create a {type}</h2>
        <form action="" class="creation-form">
            <label for="creating-title">Name</label>
            <input type="text" id="creating-title" bind:value="{input}">
        </form>
        <div class="buttons">
            <button class="cancel-button" on:click={cancel}>Cancel</button>
            <button class="create-button" on:click={create}>Create</button>
        </div>
    </div>
</div>