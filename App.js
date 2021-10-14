import React, {useState, useEffect, useRef} from "react"

function App() {
    const STARTING_TIME = 5
    const [text, setText] = useState("")
    const [time, setTime] = useState(STARTING_TIME)
    const [start, setStart] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const inputRef = useRef(null)

    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }

    function numberOfWords(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }

    function startGame(){
        setStart(true)
        setTime(STARTING_TIME)
        setWordCount(0)
        setText("")
        inputRef.current.disabled = false
        inputRef.current.focus()
    }

    function endGame() {
        setStart(false)
        setWordCount(numberOfWords(text)) 
    }

    useEffect(()=>{
        if(start && time>0){
            setTimeout(()=>{
                setTime(time => time-1)
            },1000)
        }
        else if(time===0){
            endGame()
        }
    },[time,start])

    return (
        <div className="container">
            <div></div>
            <div>
                <h1>Milyen gyorsan gépelsz?</h1>
                <textarea ref={inputRef} disabled={!start} name="text" value={text} onChange={handleChange}/>
                <h3>Hátralévő idő: {time}</h3>
                <button disabled={start} onClick={startGame}>Start</button>
                <h1 id="wordCount">Szavak száma: {wordCount}</h1>
            </div>
            <p>React App by <a target="_blank" href="https://marcmesz.github.io/">Márton Mészöly</a></p>            
        </div>
    )
}

export default App