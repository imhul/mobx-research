import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

class AppState {
    @observable timer = 0;
    @observable reseted = false;

    constructor() {
        setInterval(() => {
            this.timer += 1;
            if (this.timer > 10) this.resetTimer();
        }, 1000);
    }

    

    resetTimer() {
        this.timer = 0;
        this.reseted = true;
    }
}

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    
    render() {
        
        return (
            <div style={this.props.appState.reseted ? {backgroundColor: 'red'} : null }>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
            </div>
        );
     }

     onReset = () => {
         this.props.appState.resetTimer();
     }
};

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));
