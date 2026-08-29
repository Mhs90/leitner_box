import { useState } from 'react'
import Box from '../../Components/Box'
import Word from '../../Components/Word'
import './style.css'
// import { customFetch } from '../../services/customFetch'

export default function LeitnerBoxPage() {
    // customFetch('/users')
    const [words, setWords] = useState([
        { word: 'travel', definition: 'go from one place to another, typically over a distance of some length.' },
        { word: 'trip', definition: 'a journey or excursion, especially for pleasure.' },
        { word: 'airplane', definition: 'a powered flying vehicle with fixed wings and a weight greater than that of the air it displaces; an aeroplane.' },
        { word: 'map', definition: 'a diagrammatic representation of an area of land or sea showing physical features, cities, roads, etc.' }
    ])
    const [isAddWord, setIsAddWord] = useState(false)
    const [wordValue, setWordValue] = useState('')
    const [definitionValue, setDefinitionValue] = useState('')
    return (
        <div className='main'>
            <h1 className='title'>جعبه لایتنر</h1>
            <div id="boxes">
                <Box boxNumber={5} wordsNumber={2} />
                <i class="fa-solid fa-arrow-left"></i>
                <Box boxNumber={4} wordsNumber={4} />
                <i class="fa-solid fa-arrow-left"></i>
                <Box boxNumber={3} wordsNumber={6} />
                <i class="fa-solid fa-arrow-left"></i>
                <Box boxNumber={2} wordsNumber={8} />
                <i class="fa-solid fa-arrow-left"></i>
                <Box boxNumber={1} wordsNumber={10} />
                <button className='overview'>مرور واژه ها</button>
            </div>
            {!isAddWord ? <div className="myWords">
                <h2>لغات من</h2>
                <div className="words">
                    {
                        words.map(element => {
                            return (<Word word={element.word} definition={element.definition} />)
                        })
                    }
                </div>
                <button onClick={() => setIsAddWord(true)}>افزودن لغت</button>
            </div> :
                <div className="myWords">
                    <h2>افزودن لغت</h2>
                    <form>
                        <label htmlFor="word">word :</label>
                        <input type="text" placeholder='word' value={wordValue} onChange={(e) => setWordValue(e.target.value)} />
                        <label htmlFor="definition">definition :</label>
                        <input type="text" placeholder='definition' value={definitionValue} onChange={(e) => setDefinitionValue(e.target.value)} />
                        <button onClick={(e) => {
                            e.preventDefault()
                            if (!wordValue || !definitionValue) {
                                alert('You should fill all of the fields')
                            }
                            else {
                                setWords(prev => {
                                    return [...prev,
                                    { word: wordValue, definition: definitionValue }]
                                })
                                setIsAddWord(false)
                                setWordValue('')
                                setDefinitionValue('')
                            }
                        }
                        }> ثبت لغت</button>
                    </form>
                </div>}
        </div>
    )
}
