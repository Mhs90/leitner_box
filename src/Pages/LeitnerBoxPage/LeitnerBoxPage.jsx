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
    const [condition, setCondition] = useState('myWords')
    const [wordValue, setWordValue] = useState('')
    const [definitionValue, setDefinitionValue] = useState('')
    const [targetWord, setTargetWord] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        // const token = localStorage.getItem('accessToken');
        // if (token) {
        //     window.location.href = '/'
        // }
        // else {
        //     window.location.href = '/signup'
        // }
        //     const data = customFetch('/users')
    }, [])

    const addWordBtnClickHandler = async (e) => {
        e.preventDefault()
        // try {
        //     const response = await fetch('/url', {
        //         method: 'POST',
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             word: wordValue,
        //             definition: definitionValue
        //         })
        //     })
        //     if (response.ok) {
        setWords(prev => {
            return [...prev,
            { word: wordValue, definition: definitionValue }]
        })
        // const message = response.json()
        //     }
        //     else {
        //         alert('خطا در اضافه شدن لغت')
        //     }
        // } catch (error) {
        //     alert(error.message || 'خطا در ارتباط با سرور')
        // }
        setCondition('myWords')
        setWordValue('')
        setDefinitionValue('')
    }
    const deleteBtnCickHandler = async e => {
        const clickedEl = e.target;
        const word = clickedEl.closest('.row').querySelector('.word').textContent.replace(':', '').trim();
        const newWords = [];
        // try {
        //     const deletResponse = await fetch('/url', {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     if (deletResponse.ok) {
        words.forEach(wordDetails => {
            if (wordDetails.word !== word) {
                newWords.push(wordDetails);
            }
        })
        setWords(newWords)
        //     }
        //     else {
        //         alert('لغت حذف نشد')
        //     }
        // } catch (error) {
        //     alert(error.message || 'لغت حذف نشد')
        // }
    }
    const changeBtnClickHandler = (event) => {
        setCondition('changeWord')
        const word = event.target.closest('.row').querySelector('.word').textContent.replace(':', '').trim();
        const definiton = event.target.closest('.row').querySelector('.description').textContent;
        setTargetWord(word)
        setWordValue(word)
        setDefinitionValue(definiton)
    }
    const changeWord = async (e) => {
        e.preventDefault()
        // try {
        //     const response = await fetch("url", {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             word: wordValue,
        //             definition: definitionValue
        //         })
        //     })
        //     if (!response.ok) {
        //         alert('لغت تغییر نکرد')
        //     }
        //     else {
        setWords(prevWords =>
            prevWords.map(item =>
                item.word === targetWord
                    ? { word: wordValue, definition: definitionValue }
                    : item
            )
        );
        //     }
        // } catch (error) {
        //     alert(error.message || 'خطا در ارتباط با سرور لغت تغییر نکرد')
        // }
        setDefinitionValue('')
        setWordValue('')
        setCondition('myWords')
    }
    return (
        <div className='main'>
            <div className="tasks" onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}>
                <div className={`task ${isMenuOpen ? 'top' : ''}`}>
                    <img src="/assets/box.png" alt="" className="avatar" />
                    <h4>Daria</h4>
                    <i className="fa fa-chevron-down"></i>
                </div>
                {isMenuOpen &&
                    <>
                        <div className="task middle">
                            <h4> تغییر پروفایل</h4>
                        </div>
                        <div className="task bottom">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <h4>خروج از حساب</h4>
                        </div>
                    </>}
            </div>
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
            {condition === 'myWords' ? <div className="myWords">
                <h2>لغات من</h2>
                <div className="words">
                    {
                        words.map((element, index) => {
                            return (<Word
                                key={index}
                                word={element.word}
                                definition={element.definition}
                                deleteBtnClickHandler={deleteBtnCickHandler}
                                changeBtnClickHandler={changeBtnClickHandler}
                            />)
                        })
                    }
                </div>
                <button className='addWordBtn' onClick={() => setCondition('addWord')}>افزودن لغت</button>
            </div > : condition === 'addWord' ?
                <div className="myWords">
                    <h2>افزودن لغت</h2>
                    <form onSubmit={addWordBtnClickHandler}>
                        <label htmlFor="word">word :</label>
                        <input type="text" placeholder='word' value={wordValue} onChange={(e) => setWordValue(e.target.value)} required />
                        <label htmlFor="definition">definition :</label>
                        <input type="text" placeholder='definition' value={definitionValue} onChange={(e) => setDefinitionValue(e.target.value)} required />
                        <button className='addWordBtn'> ثبت لغت</button>
                    </form>
                </div> :
                <div className="myWords">
                    <h2>ویرایش لغت</h2>
                    <form onSubmit={changeWord}>
                        <label htmlFor="word">word :</label>
                        <input type="text" placeholder='word' value={wordValue} onChange={(e) => setWordValue(e.target.value)} required />
                        <label htmlFor="definition">definition :</label>
                        <input type="text" placeholder='definition' value={definitionValue} onChange={(e) => setDefinitionValue(e.target.value)} required />
                        <button className='addWordBtn'> ویرایش لغت</button>
                    </form>
                </div>
            }
        </div >
    )
}