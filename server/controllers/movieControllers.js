const { openai, supabase } = require('../config/connection')
const movieData = require('../utils/movies')

const movieSearch = async (req, res) => {
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

module.exports = { movieSearch }