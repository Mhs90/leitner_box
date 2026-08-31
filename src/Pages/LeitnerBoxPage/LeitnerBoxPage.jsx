import { useEffect, useState } from 'react'
import Box from '../../Components/Box'
import Word from '../../Components/Word'
import './style.css'
// import { customFetch } from '../../services/customFetch'

export default function LeitnerBoxPage() {
    const [words, setWords] = useState([
        { word: 'travel', definition: 'go from one place to another, typically over a distance of some length.' },
        { word: 'trip', definition: 'a journey or excursion, especially for pleasure.' },
        { word: 'airplane', definition: 'a powered flying vehicle with fixed wings and a weight greater than that of the air it displaces; an aeroplane.' },
        { word: 'map', definition: 'a diagrammatic representation of an area of land or sea showing physical features, cities, roads, etc.' }
    ])
    const [isAddWord, setIsAddWord] = useState(false)
    const [wordValue, setWordValue] = useState('')
    const [definitionValue, setDefinitionValue] = useState('')
    // useEffect(() => {
    //     const data = customFetch('/users')
    // }, [])

    const addWordBtnClickHandler = async (e) => {
        e.preventDefault()
        setWords(prev => {
            return [...prev,
            { word: wordValue, definition: definitionValue }]
        })
        try {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    word: wordValue,
                    definition: definitionValue
                })
            })
            if (response.ok) {
                const message = response.json()
            }
            else {
                alert('خطا در اضافه شدن لغت')
            }
        } catch (error) {
            alert(error.message || 'خطا در ارتباط با سرور')
        }
        setIsAddWord(false)
        setWordValue('')
        setDefinitionValue('')
    }
    const deleteBtnCickHandler = async e => {
        const clickedEl = e.target;
        const word = clickedEl.closest('.row').querySelector('.word').textContent.replace(':', '').trim();
        console.log('clicked word:', word);
        console.log('words:', words);

        const newWords = [];
        try {
            const deletResponse = await fetch('/url', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (deletResponse.ok) {
                words.forEach(wordDetails => {
                    if (wordDetails.word !== word) {
                        newWords.push(wordDetails);
                    }
                })
                setWords(newWords)
            }
            else{
                alert('لغت حذف نشد')
            }
        } catch (error) {
            alert(error.message || 'لغت حذف نشد')
        }
    }
    return (
        <div className='main'>
            <h1 className='title'>جعبه لایتنر</h1>
            <div id="boxes">
                <Box boxNumber={5} wordsNumber={2} />
                <i className="fa-solid fa-arrow-left"></i>
                <Box boxNumber={4} wordsNumber={4} />
                <i className="fa-solid fa-arrow-left"></i>
                <Box boxNumber={3} wordsNumber={6} />
                <i className="fa-solid fa-arrow-left"></i>
                <Box boxNumber={2} wordsNumber={8} />
                <i className="fa-solid fa-arrow-left"></i>
                <Box boxNumber={1} wordsNumber={10} />
                <button className='overview'>مرور واژه ها</button>
            </div>
            {!isAddWord ? <div className="myWords">
                <h2>لغات من</h2>
                <div className="words">
                    {
                        words.map((element, index) => {
                            return (<Word key={index} word={element.word} definition={element.definition} deleteBtnClickHandler={deleteBtnCickHandler} />)
                        })
                    }
                </div>
                <button className='addWordBtn' onClick={() => setIsAddWord(true)}>افزودن لغت</button>
            </div> :
                <div className="myWords">
                    <h2>افزودن لغت</h2>
                    <form onSubmit={addWordBtnClickHandler}>
                        <label htmlFor="word">word :</label>
                        <input type="text" placeholder='word' value={wordValue} onChange={(e) => setWordValue(e.target.value)} required />
                        <label htmlFor="definition">definition :</label>
                        <input type="text" placeholder='definition' value={definitionValue} onChange={(e) => setDefinitionValue(e.target.value)} required />
                        <button className='addWordBtn'> ثبت لغت</button>
                    </form>
                </div>}
        </div>
    )
}
