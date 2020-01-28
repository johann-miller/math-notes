<script>
    import { goto } from '@sapper/app'
    import { onMount, createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    let selectedCourse, selectedChapter, chapters, sections
    let courses = []

    onMount(() => {
        let db = firebase.firestore()

        db.collection("courses").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push(doc.data())
            })
            courses = courses
        })
    })

    function selectCourse(course) {
        selectedCourse = course
        let result = courses.find(object => object.title == course)

        chapters = result.chapters
        selectedChapter = chapters[0]
        sections = chapters[0].sections
    }

    function selectChapter(chapter) {
        selectedChapter = chapter
        let result = chapters.find(object => object.title == chapter)

        sections = result.sections
    }

    function selectSection(section) {
        goto(`/editor/${section.postID}`)
    }
</script>

<style>
    .index {
        margin-right: 1rem;
    }

    .selection-button {
        background: none;
        color: inherit;
        border: none;
        width: 100%;
    }

    .selection-container {
        display: flex;
        align-items: start;
        margin-top: 3rem;
    }

    .list-section {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        width: 20rem;
        margin: 0.25rem;
        padding: 0 1rem;
        border-left: 1px #d6d9dc solid;
    }

    .new-button {
        background: none;
    }

    .selected {
        background: #d6d9dc;
    }

    .selection-list {
        list-style-type: none;
        width: 100%;
    }

    .selection-list > li {
        padding: 0.75rem 0;
        margin: 0.25rem 0;
        width: 100%;
    }

    .title {
        margin-top: 3rem;
    }
</style>

<h1 class="title">Select a section to edit</h1>
<div class="selection-container">
    <section class="courses list-section">
        <button class="new-button">New course</button>
        <ul class="selection-list">
        {#each courses as course}
            <li>
            <button class="selection-button" on:click="{() => selectCourse(course.title)}" class:selected="{course.title == selectedCourse}">
                {course.title}
            </button>
            </li>
        {/each}
        </ul>
    </section>
    <section class="chapters list-section">
        {#if chapters}
        <button class="new-button">New chapter</button>
            <ul class="selection-list" type="1">
                {#each chapters as chapter, index}
                    <li>
                        <button class="selection-button" on:click="{() => selectChapter(chapter.title)}" class:selected="{chapter.title == selectedChapter}">
                            <span class="index">{index + 1}</span>{chapter.title}
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
    <section class="sections list-section">
        {#if sections}
            <button class="new-button">New section</button>
            <ul class="selection-list" type="1">
                {#each sections as section, index}
                <li>
                    <button class="selection-button" on:click="{() => selectSection(section)}">
                        <span class="index">{index + 1}</span>{section.title}
                    </button>
                </li>
                {/each}
            </ul>
        {/if}
    </section>
</div>