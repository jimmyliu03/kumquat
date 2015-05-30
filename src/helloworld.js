

var Kumquat = React.createClass({
  getInitialState: function() {
    return {
      state: 'intro'
    };
  },

  render: function() {
    if (this.state.state === 'intro') {
      return <KumquatIntro onClick={this._handleIntroClick} />
    }

    return (
      <div> Enter your name: </div>
    );
  },

  _handleIntroClick: function() {
    this.setState({state: 'main'});
  },
});

var KumquatIntro = React.createClass({
  render: function() {
    return (
      <div>
        <h1>
          Hi, we're Kumquat.
        </h1>
        <h1>
          We'll help you find the answers to your immigration problems.
        </h1>
        <button
          onClick={this.props.onClick}>
          Get started
        </button>
      </div>
    );
  },
})
React.render(
  <Kumquat />,
  document.getElementById('root')
);
