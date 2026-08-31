export default function Word({ word, definition ,deleteBtnClickHandler}) {
    return (
        <div className="row">
            <p className="word">{word} :</p><p className='description'>{definition}</p>
            <div className="buttons">
                <button onClick={deleteBtnClickHandler}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )
}