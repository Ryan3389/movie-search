const MovieFormComponent = ({ input, buttonText }) => {
    return (
        <form className="form">
            {input.map((inputField, index) => {
                return <div className="input-div" key={index}>
                    <label htmlFor={inputField.name}>{inputField.label}</label>
                    <textarea className="textarea" name={inputField.name} placeholder={inputField.placeholder} id={inputField.name}></textarea>
                </div>
            })}
            <input type="submit" className="submit-btn" value={buttonText} />
        </form>
    )
}

export default MovieFormComponent