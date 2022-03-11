import './Letter.scss';

function Letter ( { letter, status } ) {
    
    const letterClass = (status) => {
        if (status === 'active'){
            return 'letter--dark'
        } else {
            return 'letter--light'
        };
    };

    const boxClass = (status) => {
        return `box--${status}`
    }

    return (
        <div className={`box ${boxClass(status)}`}>
            <p className={`letter ${letterClass(status)}`}>{letter}</p>
        </div>
    );
};

export default Letter;