import './GameEnd.scss';
import restartIcon from '../../assets/images/restart.png'

function GameEnd ( { status, restart } ) {
    
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
            <img src={restartIcon} onClick={restart} className="game__restart"/>
        </div>
    );
};

export default GameEnd;