function QuestionBlock(props){
    return(
    <section className="questions"> 
                <div className="question">
                    <h2> {props.question}</h2>
                    <ul>
                        {props.choices}
                    </ul>
                    <hr />
                </div>
    </section>
    )
}

export default QuestionBlock