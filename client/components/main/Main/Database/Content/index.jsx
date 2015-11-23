'use strict';

import React from 'react';
import TabBar from './TabBar';
import KeyContent from './KeyContent';
import Terminal from './Terminal';
import Footer from './Footer';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      pattern: '',
      db: 0,
      tab: 'Content'
    };
  }

  init(keyName, keyType) {
    if (keyType) {
      this.setState({ keyType });
      return;
    }
    this.props.redis.type(keyName, (_, keyType) => {
      this.setState({ keyType });
    });
  }

  componentDidMount() {
    this.init(this.props.keyName, this.props.keyType);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyName !== this.props.keyName || nextProps.keyType !== this.props.keyType) {
      this.init(nextProps.keyName, nextProps.keyType);
    }
  }

  handleTabChange(tab) {
    console.log(tab);
    this.setState({ tab });
  }

  render() {
    return <div className="pane sidebar" style={ { height: '100%' } }>
      <TabBar
        onSelectTab={this.handleTabChange.bind(this)}
      />
      <KeyContent
        style={{ display: this.state.tab === 'Content' ? 'flex' : 'none' }}
        keyName={this.props.keyName}
        keyType={this.state.keyType}
        height={this.props.height - 67}
        redis={this.props.redis}
      />
      <Terminal
        style={{ display: this.state.tab === 'Terminal' ? 'block' : 'none' }}
        height={this.props.height - 67}
        redis={this.props.redis}
        connectionKey={ this.props.connectionKey }
        onDatabaseChange={this.props.onDatabaseChange}
      />
      <Footer
        keyName={this.props.keyName}
        keyType={this.state.keyType}
        redis={this.props.redis}
      />
    </div>;
  }
}

export default Content;
