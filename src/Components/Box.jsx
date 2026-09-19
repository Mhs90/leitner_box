export default function Box({ boxNumber, wordsNumber }) {
    const boxesClickHandler = () => {
        window.location.href =`/box/${boxNumber}`
        
    }
    return (
        <div className="box" onClick={boxesClickHandler}>
            <img src={`/assets/${boxNumber === 1 ? 'first'
                : boxNumber === 2 ? 'second'
                    : boxNumber === 3 ? 'third'
                        : boxNumber === 4 ? 'forth'
                            : 'fifth'}-box.png`} alt="boximage" />
            <h4>جعبه {boxNumber}</h4>
            <div className="nubmer">تعداد لغات : {wordsNumber}</div>
        </div>
    )
}
