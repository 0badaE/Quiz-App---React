function Questions (props){
return(
    <>
        <main className = "StartPage">
            <section className="questions"> 
                {props.block}
            </section>
           
           {
            props.result.length > 0 ?  
            <div className = "results">
                <h4>You scored {props.finalResult}/5 correct answers</h4>
                <button onClick={props.refresh}>Try again</button>
                
            </div>
            :
            <button  
            style = {{
            marginTop: "550px"
            }}
            onClick={props.checkAnswer}>Check Answers</button>
            }           
        </main>
    </>
    )
}

export default Questions