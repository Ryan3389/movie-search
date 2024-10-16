import { useState } from "react"
import MovieFormComponent from "../components/movieFormComponent"
const MovieSearchPage = () => {
    const [formState, setFormState] = useState({
        movieGenre: "",
    })

    const [loading, setLoading] = useState(false)

    const [aiResponse, setAiResponse] = useState("")

    const inputFields = [

        { name: "movieGenre", type: "text", label: "What do you feel like watching ?", placeholder: "ex: action" },
        // { name: "movieLength", type: "text", label: "What is your time limit ?", placeholder: "Over or under 2 hours" }
    ]
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch("/api/movie/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })
            if (formState.movieGenre === "") {
                setLoading(false)
                return console.log("Please fill in form")
            } else {
                setLoading(true)
                const data = await response.json()
                const content = data.content
                setAiResponse(content)
                setFormState({
                    movieGenre: ""
                })
            }

        } catch (error) {
            console.log('Error, location: handleFormSubmit function: ', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="container">
            <article className="form-section">
                <div className="mb-5">
                    <h1 className="lg:text-4xl text-center mb-5 md:text-2xl">Lets's pick a movie</h1>
                    <p className="lg:text-2xl mb-5 md:text-xl">Fill out the form below, AI will do the rest</p>
                </div>
                <MovieFormComponent
                    input={inputFields}
                    buttonText="Let's Go"
                    formSubmit={handleFormSubmit}
                    formState={formState}
                    handleChange={handleChange}
                />
            </article>
            <article className="ai-response">
                {/* {aiResponse ? <p>{aiResponse}</p> : <p>Your movie recommendation will show here</p>} */}
                {loading ? (
                    <p className="lg:text-xl md:text-sm">Loading results...</p>
                ) : aiResponse ? (
                    <p className="lg:text-xl md:text-sm">{aiResponse}</p>
                ) : (
                    <p className="lg:text-xl md:text-sm">Your movie recommendation will show here</p>
                )}

            </article>
        </section>
    )
}

export default MovieSearchPage