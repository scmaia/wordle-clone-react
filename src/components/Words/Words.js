import './Words.scss';
import Word from "../Word/Word";

function Words ({width, height}) {
    return (
        <div className='words'>
            <Word/>
            <Word/>
            <Word/>
            <Word/>
            <Word/>
            <Word/>
        </div>
    );
};

export default Words;