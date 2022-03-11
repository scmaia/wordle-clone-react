import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import './Words.scss';
import Word from "../Word/Word";
import GameEnd from "../GameEnd/GameEnd";
import Warning from "../Warning/Warning";
import { Component } from 'react';

class Words extends Component {
    state = this.initialState();

    componentDidMount () {
        window.addEventListener('keydown', (event) => {
            this.keydownHandler(event.code);
        });
    };

    initialState () {
        return {
            seed: uuidv4(),
            gameStatus: 'active',
            activeWord: 0,
            words:[
                {
                    word: '',
                    statusList: [],
                },
                {
                    word: '',
                    statusList: [],
                },
                {
                    word: '',
                    statusList: [],
                },
                {
                    word: '',
                    statusList: [],
                },
                {
                    word: '',
                    statusList: [],
                },
                {
                    word: '',
                    statusList: []
                }
            ]
        };
    }

    checkWord (guessWord) {
        let reqObj = {word: guessWord, seed: this.state.seed};
        axios
            .post ('https://bstn-wordle-clone-api.herokuapp.com/word/guess', reqObj)
            .then( (res) => {
                if (res.data.correct){
                    this.setState ({gameStatus:'You Win!'})
                    return;
                }
                if (!res.data.correct && this.state.activeWord === 5) {
                    this.setState ({gameStatus:'Game Over'})
                    return;
                }
                let newWords = [...this.state.words];
                newWords[this.state.activeWord].statusList = res.data.letters.map(letter => letter.status);
                console.log(res);
                let newActiveWord = this.state.activeWord + 1;
                this.setState( {words: newWords, activeWord: newActiveWord} )
            })
            .catch( (err) => {
                console.log(err)
                this.setState({gameStatus:'Not in word list'})
                setTimeout(()=> this.setState({gameStatus:'active'}), 3000)
            })
    };

    keydownHandler = (key) => {
        if (key.includes('Key') && this.state.words[this.state.activeWord].word.length < 5) {
            let letter = key.slice(-1);
            let newWords = [...this.state.words];
            newWords[this.state.activeWord].word = newWords[this.state.activeWord].word.concat(letter);
            newWords[this.state.activeWord].statusList.push('active');
            this.setState( {words: newWords} )
            return;
        };
        if (key === 'Backspace') {
            let newWords = [...this.state.words];
            newWords[this.state.activeWord].word = newWords[this.state.activeWord].word.slice(0, -1);
            newWords[this.state.activeWord].statusList.pop();
            this.setState( {words: newWords} )
            return;
        }
        if (key === 'Enter') {
            // send word to API
            this.checkWord(this.state.words[this.state.activeWord].word);
        }
    };

    restartGame = () => {
        this.setState(this.initialState())
        axios
            .post('https://bstn-wordle-clone-api.herokuapp.com/word/')
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    render () {
        return (
            <div className='words'>
                <h2>WORDLE, KINDA</h2>
                <Word word={this.state.words[0]}/>
                <Word word={this.state.words[1]}/>
                <Word word={this.state.words[2]}/>
                <Word word={this.state.words[3]}/>
                <Word word={this.state.words[4]}/>
                <Word word={this.state.words[5]}/>
                <Warning status={this.state.gameStatus}/>
                <GameEnd status={this.state.gameStatus} restart={this.restartGame}/>
            </div>
        );
    };
};

export default Words;
