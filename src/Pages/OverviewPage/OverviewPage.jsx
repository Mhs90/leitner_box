import { useState, useEffect } from 'react';
import './style.css';

export default function OverviewPage() {
    const [word, setWord] = useState('travel')
    const [definition, setDefinition] = useState('')
    const [isQuestion, setIsQuestion] = useState(false)
    const [definitionValue, setDefinitionValue] = useState('')
    const [index, setIndex] = useState(0)
    const serverResponse = async (num) => {
        const response = await fetch('url/words')
        const wordsData = await response.json()
        return [wordsData[num].word, wordsData[num].definition, wordsData[num].condition];
    }
    const speakWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);
        speech.lang = 'en-EN';
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };
    const dontKnowClickHandler = async () => {
        setDefinition((await serverResponse(index))[1])
        setTimeout(async () => {
            const currentWord = await serverResponse(index)
            const response = await fetch('/url/words', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: `${Number(currentWord[2]) === 1 ? 1 : Number(currentWord[2]) - 1}`
                })
            })
            if (response.ok) {
                setIndex(index + 1)
                setIsQuestion(false)
            } else {
                alert('دوباره تلاش کنید')
            }
        }, 3000);
    }
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const currentWord = await serverResponse(index)
        if (currentWord[1].toLowerCase().trim() === definitionValue.toLowerCase().trim()) {
            const response = await fetch('/url/words', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: `${Number(currentWord[2]) + 1}`
                })
            })
            if (response.ok) {
                setIndex(index + 1)
                setIsQuestion(false)
            } else {
                alert('دوباره تلاش کنید')
            }
        } else {
            const response = await fetch('/url/words', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: `${Number(currentWord[2]) === 1 ? 1 : Number(currentWord[2]) - 1}`
                })
            })
            if (response.ok) {
                setDefinition((await serverResponse(index))[1])
                setTimeout(() => {
                    setIsQuestion(false)
                    setIndex(index + 1)
                    setDefinition('')
                }, 3000);
            } else {
                alert('دوباره تلاش کنید')
            }
        }
    }
    useEffect(() => {
        const firstResponse = async () => {
            setWord((await serverResponse(index))[0])
        }
        firstResponse()
    }, [index])
    return (
        <div className="main">

            <div className='container'>
                <div className="word">
                    <h1 className="wordTitle">{word}</h1>
                    <button className="wordPlayBtn" onClick={() => speakWord(word)}><i className="fas fa-volume-up"></i></button>
                    <footer>{definition}</footer>
                </div>
                <button className='dontKnow' onClick={dontKnowClickHandler}>بلد نیستم  <i className="fas fa-circle-question"></i></button>
                <button className='know' onClick={() => {
                    setIsQuestion(true)
                    setDefinitionValue('')
                }}>بلدم  <i className="fas fa-brain"></i></button>
                {isQuestion && <form onSubmit={formSubmitHandler}>
                    <label htmlFor="definition">: معنی کلمه را وارد کنید</label><br />
                    <input
                        type="text"
                        className="definition"
                        placeholder='معنی'
                        value={definitionValue}
                        onChange={e => setDefinitionValue(e.target.value)} /><br />
                    <button className='sabt'>ثبت <i className="fas fa-check-circle"></i></button>
                </form>}
            </div>
        </div>
    )
}
