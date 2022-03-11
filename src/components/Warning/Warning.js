import './Warning.scss';

function Warning ( { status } ) {
    
    const warnClass = (status) => {
        if (status === 'Not in word list'){
            return 'warn--visible'
        } else {
            return;
        }
    };

    return (
        <div className={`warn ${warnClass(status)}`}>
            <p className="warn__text">{status}</p>
        </div>
    );
};

export default Warning;