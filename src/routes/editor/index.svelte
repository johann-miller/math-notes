<script>
    import { goto } from '@sapper/app'
    import { onMount, createEventDispatcher } from 'svelte'
    import CreatingCard from '../../components/CreatingCard.svelte'
    const dispatch = createEventDispatcher()

    let selectedCourse, selectedChapter, chapters, sections, type
    let courses = []
    let creating = false

    onMount(() => {
        getCourses()
    })

    function getCourses() {
        let db = firebase.firestore()

        db.collection("courses").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push({id: doc.id, content: doc.data()})
            })
            courses = courses
        })
    }

    function selectCourse(course) {
        selectedCourse = course
        let result = courses.find(object => object.content.title == course)

        chapters = result.content.chapters
        selectedChapter = chapters[0]
        sections = chapters[0].sections
    }

    function selectChapter(chapter) {
        selectedChapter = chapter

        sections = chapters[chapter].sections
    }

    function selectSection(section) {
        goto(`/editor/${section.postID}`)
    }

    function newContent(input) {
        type = input
        creating = true
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
        <button class="new-button" on:click="{() => newContent('course')}">New course</button>
        <ul class="selection-list">
            {#each courses as course}
                <li>
                <button class="selection-button" on:click="{() => selectCourse(course.content.title)}" class:selected="{course.content.title == selectedCourse}">
                    {course.content.title}
                </button>
                </li>
            {/each}
        </ul>
    </section>
    <section class="chapters list-section">
        {#if chapters}
        <button class="new-button" on:click="{() => newContent('chapter')}">New chapter</button>
            <ul class="selection-list" type="1">
                {#each chapters as chapter, index}
                    <li>
                        <button class="selection-button" on:click="{() => selectChapter(index)}" class:selected="{index == selectedChapter}">
                            <span class="index">{index + 1}</span>{chapter.title}
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
    <section class="sections list-section">
        {#if sections}
            <button class="new-button" on:click="{() => newContent('section')}">New section</button>
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
{#if creating}
    <CreatingCard 
        on:cancel={() => {creating = false}} 
        type={type} 
        selectedCourse={selectedCourse} 
        selectedChapter={selectedChapter}
     />
{/if}