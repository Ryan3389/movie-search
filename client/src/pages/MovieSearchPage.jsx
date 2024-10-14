
import MovieFormComponent from "../components/movieFormComponent"
const MovieSearchPage = () => {

    const inputFields = [

        { name: "questionTwo", type: "text", label: "What do you feel like watching ?", placeholder: "ex: action" },
        { name: "questionThree", type: "text", label: "What is your time limit ?", placeholder: "Over or under 2 hours" }
    ]

    return (
        <section className="form-section">
            <MovieFormComponent
                input={inputFields}
                buttonText="Let's Go"
            />
        </section>
    )
}

export default MovieSearchPage