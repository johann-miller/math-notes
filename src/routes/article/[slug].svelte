<script context="module">
    // export async function preload(page, session) {
    //     const { slug } = page.params
    //     const db = firebase.firestore()
    //     const articleRef = db.collection('articles').doc({ slug }.slug)
    //     let { article } = ''
        
    //     articleRef.get()
    //         .then(function(doc) {
    //             if(doc.exists) {
    //                 console.log(doc.data())
    //                 article = doc.data()
    //             }
    //         })

    //     return { article }
    // }
</script>

<script>
    import { stores } from "@sapper/app"
    import { onMount } from 'svelte'
    let db, article
    const { page } = stores()
    const { slug } = $page.params

    onMount(() => {
        db = firebase.firestore()
        const articleRef = db.collection('articles').doc(slug)
        console.log(slug)

        articleRef.get().then(function(doc) {
            if(doc.exists) {
                article = doc.data()
            }
        })
    })

    function date(timestamp) {
        let date = new Date(timestamp * 1000).toDateString();
        return date
    }
</script>

{#if article}
<h1>{article.title}</h1>
<span>{date(article.created.seconds)}</span><br/>
{@html article.body}
{/if}