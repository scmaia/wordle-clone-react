import './GameEnd.scss';

function GameEnd ( { status } ) {
    
    const gameClass = (status) => {
        if (status === 'You Win!'){
            return 'game--win'
        } else if (status === 'Game Over'){
            return 'game--lose'
        } else {
            return;
        }
    };

    return (
        <div className={`game ${gameClass(status)}`}>
            <p className="game__text">{status}</p>
        </div>
    );
};

export default GameEnd;