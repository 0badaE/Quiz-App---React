import React from "react" 

function AnswerChoices(props){
    const [isHovered, setIsHovered] = React.useState(false);
    

    let backgroundColor = 'white';
    if (props.status === undefined) {
        backgroundColor = isHovered || props.isHeld ? '#D6DBF5' : 'white';
      } else if (props.status) {
        backgroundColor = '#81f785';
      } else {
        backgroundColor = '#f07a7e';
      }

    const styles = {
        backgroundColor: backgroundColor
    }
   
    return(
        <>
            <li
                style = {styles}
                onClick = {props.holdAnswer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {props.option}
            </li>
        </>
    )

}

export default AnswerChoices