import { useState } from "react"
import MovieFormComponent from "../components/movieFormComponent"
const MovieSearchPage = () => {
    const [formState, setFormState] = useState({
        movieGenre: "",
        movieLength: ""
    })

    const [aiResponse, setAiResponse] = useState("")

    const inputFields = [

        { name: "movieGenre", type: "text", label: "What do you feel like watching ?", placeholder: "ex: action" },
        { name: "movieLength", type: "text", label: "What is your time limit ?", placeholder: "Over or under 2 hours" }
    ]
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/movie/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })

            const data = await response.json()
            const content = data.content
            setAiResponse(content)
        } catch (error) {
            console.log('Error, location: handleFormSubmit function: ', error);
        }
    };

    return (
        <section className="container">
            <article className="form-section">
                <div className="mb-5">
                    <h1 className="text-4xl text-center mb-5">Lets's pick a movie</h1>
                    <p className="text-2xl mb-5">Fill out the form below, AI will do the rest</p>
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
                {aiResponse ? <p>{aiResponse}</p> : <p>Your movie recommendation will show here</p>}
            </article>
        </section>
    )
}

export default MovieSearchPage