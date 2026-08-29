export default function Word({ word, definition }) {
    return (
        <div className="row">
            <p className="word">{word} :</p><p className='description'>{definition}</p>
        </div>
    )
}