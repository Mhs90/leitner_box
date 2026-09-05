import { useState, useEffect } from 'react';
import './style.css';

export default function OverviewPage() {
    const [word, setWord] = useState('travel')
    const [definition, setDefinition] = useState('')
    const [isQuestion, setIsQuestion] = useState(false)
    const [definitionValue, setDefinitionValue] = useState('')
    const [index, setIndex] = useState(0)

    const speakWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);
        speech.lang = 'en-EN';
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };
    return (
        <div className='container'>
            <div className="word">
                <h1 className="wordTitle">travel</h1>
                <button className="wordPlayBtn" onClick={() => speakWord(word)}><i className="fas fa-volume-up"></i></button>
                <footer>{definition}</footer>
            </div>
            <button className='dontKnow' onClick={() => setDefinition('go from one place to another, typically over a distance of some length.')}>بلد نیستم  <i className="fas fa-circle-question"></i></button>
            <button className='know' onClick={() => setIsQuestion(true)}>بلدم  <i className="fas fa-brain"></i></button>
            {isQuestion && <form>
                <label htmlFor="definition">: معنی کلمه را وارد کنید</label><br />
                <input
                    type="text"
                    className="definiton"
                    placeholder='معنی'
                    value={definitionValue}
                    onChange={e => setDefinitionValue(e.target.value)} /><br />
                <button className='sabt'>ثبت <i className="fas fa-check-circle"></i></button>
            </form>}
        </div>
    )
}
