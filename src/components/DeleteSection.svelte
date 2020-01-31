<script>
    import { createEventDispatcher, onMount } from 'svelte'

    export let course, chapter, section, type = ''
    let db
    let dispatch = createEventDispatcher()

    onMount(() => {
        db = firebase.firestore()
    })

    function deleteSection() {
        switch(type) {
            case 'course':
                console.log(`Deleting course ${course}`)
                db.collection('courses').doc(course).delete().then(() => {
                    dispatch('update')
                })
                break
            case 'chapter':
                console.log(`Deleting chapter ${chapter}`)
                break
            case 'section':
                console.log(`Deleting section ${section}`)
                break
        }
    }
</script>

<button on:click={deleteSection}>Delete</button>