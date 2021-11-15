import React from 'react';
import CSSModules from 'react-css-modules';
import ReactLogo from '@/assets/images/react.png';
import DumiLogo from '@/assets/images/dumi.png';
import styles from '@/assets/styles/index.module.less';

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
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
        console.log('test')
    }

    render() {
        this.test();
        return (
            <div>
                <div styleName="aa">App</div>
                <img src={ReactLogo} />
                <img src={DumiLogo} />
                <div className="logo-png" style={{ height: 180 }}>logo-png</div>
            </div>
        );
    }
}
