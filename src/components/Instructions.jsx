function Instructions (props){
    return(
    <>
        <main className = "StartPage">
        <img className = "blob1" src= "https://i.ibb.co/m5GGxQv/blob-5.png"/>
        <section className = "start-page-text">
            <h1> Quizzical </h1>
            <p>Quizzical asks 5 random questions on various topics. It’s a fun way to test your knowledge and learn new things.</p>
        </section>
        <button 
        onClick = {props.onClick}
        style = {{
            marginTop: "25px"
            }}>Start Quiz</button>
        <img className = "blob2" src= "https://i.ibb.co/RNjd3zH/blob-6.png"/>
        </main>
    </>
    )
}

export default Instructions