<script>
    import { stores } from "@sapper/app"
    import { onMount, afterUpdate } from 'svelte'
    let db, article
    const { page } = stores()
    const { slug } = $page.params

    // Gets article from database
    onMount(() => {
        db = firebase.firestore()
        const articleRef = db.collection('articles').doc(slug)

        articleRef.get().then(function(doc) {
            if(doc.exists) {
                article = doc.data()
            }
        })
    })

    // Rerender any math after the article content has been updated
    afterUpdate(() => {
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

    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "article"]);
    }
    })

    function date(timestamp) {
        let date = new Date(timestamp * 1000);
        let month = date.getMonth()
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        month = months[month]

        date = `${month} ${date.getDate()}, ${date.getFullYear()}`
        return date
    }
</script>

<style>
    article {
        width: 100%;
        max-width: 40rem;
        margin-bottom: 5rem;
        padding: 0 1rem;
    }

    header {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        border-bottom: 1px #3f3e3c solid;
    }

    .date {
        font-weight: 300;
        color: #656462;
    }

    .video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        height: 0;
        margin-bottom: 2rem;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>

<article id="article">
    {#if article}
        <div class="video-container">
            <iframe src="{article.video}" frameborder="0" title="video" class="video"></iframe>
        </div>
        <header>
            <h1>{article.title}</h1>
            <span class="date">Published {date(article.created.seconds)}</span>
            {#if article.edited}
                <span class="date">Last edited {date(article.edited.seconds)}</span>
            {/if}
        </header>
        {@html article.body}
    {/if}
</article>