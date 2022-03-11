import axios from 'axios';
import './Words.scss';
import Word from "../Word/Word";
import { Component } from 'react';

class Words extends Component {
    state = {
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

    componentDidMount () {
        window.addEventListener('keydown', (event) => {
            this.keydownHandler(event.code);
        });
    };

    checkWord (guessWord) {
        let reqObj = {word: guessWord};
        axios
            .post ('http://localhost:8080/word/guess', reqObj)
            .then( (res) => {
                if (res.data.correct){
                    this.gameWin(true)
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
            })
    };

    gameWin (status) {

    }

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
           
            if (this.state.activeWord === 5) {
                this.gameWin(false);
                return;
            } else {

                return;
            }
        }
    };

    render () {
        return (
            <div className='words'>
                <Word word={this.state.words[0]}/>
                <Word word={this.state.words[1]}/>
                <Word word={this.state.words[2]}/>
                <Word word={this.state.words[3]}/>
                <Word word={this.state.words[4]}/>
                <Word word={this.state.words[5]}/>
            </div>
        );
    };
};

export default Words;