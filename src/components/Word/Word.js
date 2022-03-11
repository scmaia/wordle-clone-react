import './Word.scss';
import Letter from "../Letter/Letter";

function Word ({word}) {
    // console.log(word);
    const wordArray = word.word.split('');
    return (
        <div className='word'>
            <Letter letter={wordArray?.[0] || ''} status={word.statusList?.[0] || 'empty'}/>
            <Letter letter={wordArray?.[1] || ''} status={word.statusList?.[1] || 'empty'}/>
            <Letter letter={wordArray?.[2] || ''} status={word.statusList?.[2] || 'empty'}/>
            <Letter letter={wordArray?.[3] || ''} status={word.statusList?.[3] || 'empty'}/>
            <Letter letter={wordArray?.[4] || ''} status={word.statusList?.[4] || 'empty'}/>
        </div>
    );
};

export default Word;