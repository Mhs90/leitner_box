export default function Box({ boxNumber, wordsNumber }) {
    return (
        <div className="box">
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
