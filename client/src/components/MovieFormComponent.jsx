const MovieFormComponent = ({ input, buttonText, formSubmit, formState, handleChange }) => {
    return (
        <form className="form" onSubmit={formSubmit} encType="multipart/form-data">
            {input.map((inputField, index) => {
                return <div className="input-div" key={index}>
                    <label htmlFor={inputField.name}>{inputField.label}</label>
                    <textarea
                        className="textarea" name={inputField.name} placeholder={inputField.placeholder}
                        id={inputField.name}
                        value={formState[inputField.name]}
                        onChange={handleChange}
                    ></textarea>
                </div>
            })}
            <input type="submit" className="submit-btn" value={buttonText} />
        </form>
    )
}

export default MovieFormComponent