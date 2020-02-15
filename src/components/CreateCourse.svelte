<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    let course = {data: {title: "New course"}}
    let creating = false
    let input = ""
    const invalidInput = [undefined, null, ""]

    function createCourse(value) {
        if (invalidInput.indexOf(value) >= 0) {
            return
        }

        let db = firebase.firestore()
        db.collection('courses').add({
            title: value,
            chapters: []
        }).then(() => {
            creating = false
            dispatch('courseCreated')
        })
    }
</script>

<style>
    .course {
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

    .rotate {
        transform: rotate(45deg);
    }
</style>

<li class="course">
    <button class="course-title" on:click={() => {creating = !creating}}>
        <span>{course.data.title}</span>
        <img src="images/plus.svg" alt="plus" class:rotate={creating}>
    </button>
    {#if creating}
    <div class="new-course">
        <form action="">
            <label for="new-course-title">Title:</label>
            <input type="text" id="new-course-title" bind:value={input}>
        </form>
        <button class="new-course-submit" on:click={() => createCourse(input)}>
            <img src="images/checkmark.svg" alt="checkmark">
        </button>
    </div>
    {/if}
</li>
