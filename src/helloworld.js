

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
        <div>
          Welcome to Kumquat
        </div>
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
