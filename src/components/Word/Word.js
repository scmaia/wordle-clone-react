import './Word.scss';
import Letter from "../Letter/Letter";

function Word () {
    return (
        <div className='word'>
            <Letter/>
            <Letter/>
            <Letter/>
            <Letter/>
            <Letter/>
        </div>
    );
};

export default Word;