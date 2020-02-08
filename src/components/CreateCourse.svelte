<script>
    let course = {data: {title: "New course"}}
    let expand = false
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

    .course-title img {
        width: 1.5rem;
        height: 1.5rem;
        filter: invert(20%) sepia(7%) saturate(259%) hue-rotate(2deg) brightness(100%) contrast(85%);
        transition: 0.1s transform ease-in-out;
    }
</style>

<li class="chapter">
    <button class="course-title" on:click={() => {}}>
        <span>{course.data.title}</span>
        <img src="images/plus.svg" alt="plus">
    </button>
</li>