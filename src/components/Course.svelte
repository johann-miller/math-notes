<script>
    import { createEventDispatcher } from 'svelte'
    import Confirmation from './Confirmation.svelte'
    import Chapter from "./Chapter.svelte"

    export let course
    const dispatch = createEventDispatcher()
    let expand, editing, confirmDeletion = false
    let input = ""

    function editCourse(value) {
        let data = {title: value}

        let db = firebase.firestore()
        db.collection('courses').doc(course.id).update(data)
        .then(() => {
            dispatch('courseEdited')
            editing = false
            input = ""
        })
    }

    function deleteCourse() {
        let db = firebase.firestore()
        db.collection('courses').doc(course.id).delete()
        .then(() => {
            editing = false
            dispatch('courseEdited')
        })
    }
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

    .toolbar img {
        width: 1.75rem;
        height: 1.75rem;
        filter: invert(20%) sepia(7%) saturate(259%) hue-rotate(2deg) brightness(100%) contrast(85%);
        transition: 0.1s transform ease-in-out;
    }

    .toolbar {
        display: flex;
    }

    .toolbar > button {
        padding: 0;
        background: none;
        border: none;
    }

    .chapters {
        background: #eeeff1;
    }

    .editing {
        display: flex;
        flex-flow: column;
        margin-bottom: 1rem;
    }

    .editing-actions {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .editing-actions button {
        margin: 0 0.5rem;
    }

    .expand {
        transform: rotate(90deg);
    }

    .new-course {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem 1rem 1rem;
    }

    .new-course form {
        display: flex;
        align-items: center;
    }

    .new-course label {
        margin-right: 0;
    }

    .new-course input {
        padding: 0;
        margin-left: 0.5rem;
        width: 12rem;
    }

    .new-course-submit {
        border: none;
        background: none;
        padding: 0;
        margin-left: 1rem;
    }

    .new-course-submit img {
        height: 1.5rem;
        width: auto;
    }
</style>

<li class="chapter">
    <div class="course-title">
        <span>{course.data.title}</span>
        <div class="toolbar">
            <button on:click={() => {editing = !editing}}>
                <img src="images/edit.svg" alt="arrow">
            </button>
            <button on:click={() => {expand = !expand}}>
                <img src="images/arrow-right.svg" alt="arrow" class:expand>
            </button>
        </div>
    </div>
    {#if editing}
        <div class="editing">
            <div class="new-course">
                <form action="">
                    <label for="new-course-title">Title:</label>
                    <input type="text" id="new-course-title" bind:value={input}>
                </form>
                <button class="new-course-submit" on:click={() => editCourse(input)}>
                    <img src="images/checkmark.svg" alt="checkmark">
                </button>
            </div>
            <div class="editing-actions">
                <button on:click={() => {editing = false}}>
                    <span>Cancel</span>
                </button>
                <button on:click={() => {confirmDeletion = true}}>
                    <span>Delete</span>
                </button>
                {#if confirmDeletion}
                    <Confirmation title={course.data.title} on:cancel={() => {confirmDeletion = false}} on:confirm={() => {deleteCourse()}} />
                {/if}
            </div>
        </div>
    {/if}
    {#if expand}
        <ol class="chapters">
            {#if (course.data.chapters != null) }
                {#each course.data.chapters as chapter, index}
                    <Chapter chapter = {chapter} index = {index} />
                {/each}
            {/if}
        </ol>
    {/if}
</li>