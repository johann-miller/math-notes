<script>
    import { onMount } from "svelte"

    let selectedCourse, selectedChapter, chapters, sections
    let courses = []
    // let courses = [
    //     {
    //     title: "Algebra",
    //     chapters: [
    //         {
    //         title: "Groups",
    //         index: 1,
    //         sections: [
    //             {title: "The dihedral groups", index: 1},
    //             {title: "Quotient groups", index: 2}
    //         ]
    //         },
    //         {
    //         title: "Rings",
    //         index: 2,
    //         sections: [
    //             {title: "Universal properties", index: 1},
    //             {title: "Products of rings", index: 2}
    //         ]
    //         }
    //     ]
    //     },
    //     {
    //     title: "Analysis",
    //     chapters: [
    //         {
    //         title: "The limit",
    //         index: 1,
    //         sections: [
    //             {title: "Sequences", index: 1},
    //             {title: "Functions", index: 2}
    //         ]
    //         },
    //         {
    //         title: "Topology",
    //         index: 2,
    //         sections: [
    //             {title: "Axioms", index: 1},
    //             {title: "Metric spaces", index: 2},
    //             {title: "Continuous functions", index: 3}
    //         ]
    //         }
    //     ]
    //     }
    // ]

    onMount(() => {
        let db = firebase.firestore()

        db.collection("courses").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push(doc.data())
                console.log(courses)
                courses = courses
            })
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
</script>

<style>
    .index {
        margin-right: 1rem;
    }

    .selection-button {
        background: none;
        color: inherit;
        border: none;
    }

    .selection-container {
        display: flex;
        align-items: start;
        margin-top: 3rem;
    }

    .list-section {
        width: 20rem;
        margin: 0.25rem;
        border-left: 1px #d6d9dc solid;
    }

    .selected {
        border: 1px red dotted;
    }

    .selection-list {
        list-style-type: none;
        margin-left: 1rem;
    }

    .selection-list > li {
        padding: 0.75rem 0;
        margin: 0.25rem 0;
    }

    .title {
        margin-top: 3rem;
    }
</style>

<h1 class="title">Select a section to edit</h1>
<div class="selection-container">
<section class="courses list-section">
    <ul class="selection-list">
    <li><button>New course</button></li>
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
    <ol class="selection-list" type="1">
    {#if chapters}
        <li><button>New chapter</button></li>
        {#each chapters as chapter, index}
        <li>
            <button class="selection-button" on:click="{() => selectChapter(chapter.title)}" class:selected="{chapter.title == selectedChapter}">
            <span class="index">{index + 1}</span>{chapter.title}
            </button>
        </li>
        {/each}
    {/if}
    </ol>
</section>
<section class="sections list-section">
    <ul class="selection-list" type="1">
    {#if sections}
        <li><button>New section</button></li>
        {#each sections as section, index}
        <li><button class="selection-button"><span class="index">{index + 1}</span>{section.title}</button></li>
        {/each}
    {/if}
    </ul>
</section>
</div>