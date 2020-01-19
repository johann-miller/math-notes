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
        let date = new Date(timestamp * 1000).toDateString();
        return date
    }
</script>

<article id="article">
    {#if article}
        <h1>{article.title}</h1>
        <span>{date(article.created.seconds)}</span><br/>
        {@html article.body}
    {/if}
</article>