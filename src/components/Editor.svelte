<script>
    import { stores } from "@sapper/app"
    import {postID, editorBody} from "./../store/post.js"
    import { onMount, afterUpdate } from "svelte"

    const { page } = stores()
    let db
    let sectionSelected = false
    let input = ""
    let idleInput

    postID.subscribe(postID => {
        if (postID != null) {
            selectSection(postID)
        }
    })
    
    function inputChange() {
        clearTimeout(idleInput);
        idleInput = setTimeout(updateOutput, 750);
        editorBody.set(input)
    }

    function updateOutput() {
        document.getElementById("output").innerHTML = input;

        if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "output"]);
        }
    }

    function selectSection(postID) {
        sectionSelected = true

        db = firebase.firestore()
        db.collection('posts').doc(postID).get().then(doc => {
            let data = doc.data()
            input = data.body

            updateOutput()
        })
    }

    

    onMount(() => {
        if (window.MathJax) {
            window.MathJax.Hub.Config({
                tex2jax: {
                    inlineMath: [["$", "$"], ["(", ")"]],
                    displayMath: [["$$", "$$"], ["[", "]"]],
                    processEscapes: true,
                    processEnvironments: true
                },
                displayAlign: "center",
                "HTML-CSS": {
                    styles: { ".MathJax_Display": { margin: 0 } },
                    linebreaks: { automatic: true }
                }
            });
        }
    });
</script>

<style>
    .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    .editor-container {
        display: grid;
        grid-area: editor;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-template-areas: "input output";
        width: 100%;
        height: 100%;
    }

    .editor-input {
        border-right: 1px #d6d9dc solid;
        display: flex;
        flex-flow: column;
        grid-area: input;
    }

    .editor-output {
        grid-area: output;
    }

    #math-input {
        background: none;
        flex-grow: 1;
        border: none;
        font-family: "Roboto", sans-serif;
        font-size: 18px;
        color: inherit;
        resize: none;
        width: 100%;
        max-width: 40rem;
        padding: 1rem;
        line-height: 1.8;
    }

    #output {
        width: 100%;
        max-width: 40rem;
        padding: 1rem;
    }

    .section-area {
        display: flex;
        flex-flow: column;
        align-items: center;
        line-height: 1.8;
        font-family: "Roboto", sans-serif;
        font-size: 18px;
        width: 100%;
        min-height: 100%;
        position: relative;
        padding-top: 1rem;
    }

    .label {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        margin-left: 0.5rem;
    }
</style>

<div class="container">
    <div class="editor-container">
    <section class="editor-input section-area">
        <span class="label">Input</span>
        <textarea id="math-input" bind:value={input} on:input={inputChange} />
    </section>
    <section class="editor-output section-area">
        <span class="label">Preview</span>
        <article id="output" />
    </section>
    </div>
</div>