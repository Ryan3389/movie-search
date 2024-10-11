const { openai, supabase } = require('../config/connection')
const movieData = require('../utils/movies')

const storeMovieDB = async (req, res) => {
    try {
        const data = await Promise.all(
            movieData.map(async (movie) => {
                const movieEmbeddngs = await openai.embeddings.create({
                    model: "text-embedding-ada-002",
                    input: JSON.stringify(movie)
                })


                return {
                    title: JSON.stringify(movie.title),
                    content: JSON.stringify(movie.content),
                    embedding: movieEmbeddngs.data[0].embedding
                }
            })
        )
        await supabase.from('movies').insert(data)
        res.status(200).json({ message: "Embedding success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'server error' })
    }
}

const queryDb = async (req, res) => {
    try {
        //Step 1 - take search term from client
        const searchTerm = req.body.text
        //Step 2 - convert that search term into an embedding
        const searchEmbedding = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: searchTerm
        })
        const searchTermEmbedding = searchEmbedding.data[0].embedding
        //Step 3 - pass in the embedded search term into the sql compare function
        const compareSearch = await supabase.rpc("match_movies", {
            query_embedding: searchTermEmbedding,
            match_threshold: 0.50,
            match_count: 1
        })

        const result = compareSearch.data[0]
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { storeMovieDB, queryDb }