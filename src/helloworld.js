

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

    return <KumquatMain />
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
});

var KumquatMain = React.createClass({

  componentDidMount: function() {
    var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: '../countries.json'
});
 
// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .typeahead').typeahead(null, {
  name: 'countries',
  source: countries
});
  },
  render: function() {
    return (
      <div className="mainRoot">
        <h1>
          My country of residence is:
        </h1>
          <div id="prefetch">
            <input className="typeahead" type="text" placeholder="Countries"/>
          </div>
      </div>
    );
  },
});

React.render(
  <Kumquat />,
  document.getElementById('root')
);
