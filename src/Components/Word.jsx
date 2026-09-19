import { useState } from 'react';

export default function Word({ word, definition, deleteBtnClickHandler, changeBtnClickHandler }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className="row">
            <p className="word" onClick={toggleExpand}>
                {word} :
            </p>

            <p className={`description ${isExpanded ? 'active' : ''}`}>
                {definition}
            </p>

            <div className="buttons">
                <button onClick={deleteBtnClickHandler}>
                    <i className="fas fa-trash"></i>
                </button>

                <button onClick={changeBtnClickHandler}>
                    <i className="fas fa-pencil"></i>
                </button>
            </div>
        </div>
    );
}