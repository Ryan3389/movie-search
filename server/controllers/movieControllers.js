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
        const movieGenre = req.body.movieGenre
        const movieLength = req.body.movieLength
        //Step 2 - convert that search term into an embedding
        const searchEmbedding = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: movieGenre, movieLength
        })
        const searchTermEmbedding = searchEmbedding.data[0].embedding
        //Step 3 - pass in the embedded search term into the sql compare function
        const compareSearch = await supabase.rpc("match_movies", {
            query_embedding: searchTermEmbedding,
            match_threshold: 0.50,
            match_count: 1
        })
        const result = compareSearch.data[0]
        const movieRecommendation = await queryResponse(searchTermEmbedding, result)
        res.status(200).json(movieRecommendation)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

const queryResponse = async (search, match) => {
    try {
        const messages = [
            {
                role: 'system',
                content: 'You will recieve two pieces of data, one called search, and one called match. Search refers to the type of movie the user likes and how long they have, match refers to the movie recommendation based off of the search, and description refers to the movie description. Use this to make a movie recommendation. Make sure your response includes a general overview of the movie. Do not copy the description, but give a good summary of it. '
            },
            {
                role: 'user',
                content: `search${search}, match: ${match.title}`
            }
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
        const responseMessage = response.choices[0].message

        return responseMessage

    } catch (error) {
        console.log(error)
    }
}



module.exports = { storeMovieDB, queryDb }

