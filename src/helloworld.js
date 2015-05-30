

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
      <div className="introRoot">
        <h1>
          Hi, we're Kumquat.
        </h1>
        <h1>
          We'll help you with your immigration situation.
        </h1>
        <br />
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
