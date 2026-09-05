export default function Word({ word, definition, deleteBtnClickHandler, changeBtnClickHandler }) {
    return (
        <div className="row">
            <p className="word">{word} :</p><p className='description'>{definition}</p>
            <div className="buttons">
                <button onClick={deleteBtnClickHandler}>
                    <i className="fas fa-trash"></i>
                </button>
                <button onClick={changeBtnClickHandler}>
                    <i className="fas fa-pencil"></i>
                </button>
            </div>
        </div>
    )
}