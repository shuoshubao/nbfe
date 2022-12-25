import React from 'react';
import ReactLogo from '@/assets/images/react.png';
import DumiLogo from '@/assets/images/dumi.png';
import '@/assets/styles/1.css';
import '@/assets/styles/1.less';
import '@/assets/styles/1.scss';
import '@/assets/styles/1.styl';

export default class extends React.Component {
    static displayName = 'App';

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    static defaultProps = {};

    test = () => {
        console.log('test');
    };

    render() {
        this.test();
        return (
            <div>
                <div>App</div>
                <img src={ReactLogo} />
                <img src={DumiLogo} />
                <div className="logo-png" style={{ height: 180 }}>
                    logo-png
                </div>
                <div className="logo-svg" style={{ height: 180 }}>
                    logo-svg
                </div>
            </div>
        );
    }
}
