
import MovieFormComponent from "../components/movieFormComponent"
const MovieSearchPage = () => {

    const inputFields = [

        { name: "questionTwo", type: "text", label: "What do you feel like watching ?", placeholder: "ex: action" },
        { name: "questionThree", type: "text", label: "What is your time limit ?", placeholder: "Over or under 2 hours" }
    ]

    return (
        <section className="form-section">
            <div className="mb-5">
                <h1 className="text-3xl text-center mb-5">Lets's pick a movie</h1>
                <p className="text-xl mb-5">Fill out the form below, AI will do the rest</p>
            </div>
            <MovieFormComponent
                input={inputFields}
                buttonText="Let's Go"
            />
        </section>
    )
}

export default MovieSearchPage