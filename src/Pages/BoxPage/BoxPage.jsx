import { useParams } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react'
import { customFetch } from '../../services/customFetch'

export default function BoxPage() {
    const [words, setWords] = useState([{ word: 'travel', definition: 'kfdhfgl' }])
    const { num } = useParams()
    useEffect(() => {
        setWords(customFetch(`/cards?box_number=${num}`))
    }, [num])

    return (
        <div className="back">
            <div className="title">
                <h3>کلمات جعبه شماره {num}</h3>
                <button title='رفتن به صفحه اصلی' onClick={() => window.location.href = '/'}><i class="fas fa-home"></i></button>
            </div>
            <div className="words">
                {
                    words.map((card, index) => {
                        return (<div className="wordContainer" key={index}>
                            <p className="word">{card.word}</p>
                            <p className="definition">{card.definition}</p>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
