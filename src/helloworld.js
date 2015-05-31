

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
      <div className="introRoot fadeIn">
      <img className = "logo" src="kumquat.png"/>
        <h1>
          Hi, we're Kumquat.
        </h1>
        <h1>
          We'll help you with your immigration situation.
        </h1>
        <br />
        <button className = "btn btn-default"
          onClick={this.props.onClick}>
          Get started
        </button>
      </div>
    );
  },
});

var KumquatMain = React.createClass({
  getInitialState: function() {
    return {stage: 'country'};
  },

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
    }).focus();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.stage === 'purpose' && prevState.stage !== 'purpose') {
      $('#purpose').focus();
    }
    if (this.state.purpose === 'study' && prevState.purpose !== 'study') {
      $('#study').focus();
    }
    if (this.state.purpose === 'work' && prevState.purpose !== 'work') {
      $('#degree').focus();
    }
    if (this.state.study !== prevState.study) {
      $('#offer').focus();
    }
  },

  render: function() {
    return (
      <div className="mainRoot fadeIn">
        <h1>
          My country of citizenship is
        </h1>
        <div id="prefetch">
          <input
            className="typeahead"
            onKeyPress={this._handleEnter}
            type="text" />
        </div>
        <br />
        {this._renderPurpose()}
        {this._renderStudy()}
        {this._renderOffer()}
        {this._renderWorkVisa()}
      </div>
    );
  },

  _renderPurpose: function() {
    if (this.state.stage === 'purpose') {
      return (
        <div className="fadeIn">
        <h1> I want to come to the US to</h1>
        <select id="purpose" className="form-control" onChange={this._handlePurposeChange} value={this.state.purpose}>
          <option selected={!this.state.purpose} disabled hidden value=''></option>
          <option value="work">work</option>
          <option value="study">study</option>
          <option value="visit">visit</option>
          <option value="invest">invest</option>
          <option value="live">live permanently</option>
        </select>
        </div>
      );
    }
    return null;
  },

  _renderStudy: function() {
    if (this.state.purpose === 'study') {
      return (
        <div className="fadeIn">
        <h1> Get an F visa.</h1> <br />
        <h1> If you're doing a vocational program, then you'll need an M visa</h1>
        </div>
      );
    }

    if (this.state.purpose === 'work') {
      return (
        <div className="fadeIn">
        <h1> The highest degree I've completed is</h1>
        <select id="degree" className="form-control" onChange={this._handleStudyChange} value={this.state.study}>
          <option selected={!this.state.study} disabled hidden value=''></option>
          <option value="highschool">high school or lower</option>
          <option value="bachelors">Bachelor's</option>
          <option value="masters">Master's or higher</option>
        </select>
        </div>
      );
    }
    return null;
  },

  _renderOffer: function() {
    if (this.state.purpose !== 'work') {
      return null;
    }
    if (this.state.study === 'highschool') {
      return (
        <div className="fadeIn">
        <h1> Go back to school</h1>
        </div>
      );
    }

    if (this.state.study === 'bachelors' || this.state.study === 'masters') {
      return (
        <div className="fadeIn">
        <h1>I</h1>

        <select id="offer" className="form-control" onChange={this._handleOfferChange} value={this.state.offer}>
          <option selected={!this.state.offer} disabled hidden value=''></option>
          <option value="offer">have an offer from a US employer</option>
          <option value="transfer">am transferring to a US branch of my current company</option>
        </select>
        </div>
      );
    }
    return null;
  },

  _renderWorkVisa: function() {
    if (this.state.purpose !== 'work' || this.state.study === 'highschool') {
      return null;
    }
    if (this.state.offer === 'offer') {
      if (this.state.country === 'Mexico' || this.state.country === 'Canada') {
        return (
          <div className="fadeIn">
            <h1>Get a TN or H1B visa</h1>
          </div>
        );
      }
      return (
        <div className="fadeIn">
          <h1>Get an H1B visa</h1>
        </div>
      );
    }

    if (this.state.offer === 'transfer') {
      return (
        <div className="fadeIn">
          <h1>Get an L1A visa</h1>
        </div>
      );
    }

    return null;
  },

  _handleEnter: function(e) {
    if (e.key === 'Enter') {
      this.setState({country: $('.typeahead.tt-input')[0].value})
      if (this.state.stage === 'country') {
        this.setState({stage: 'purpose'});
      }
    }
  },

  _handlePurposeChange: function(e) {
    this.setState({purpose: e.target.value});
  },

  _handleStudyChange: function(e) {
    this.setState({study: e.target.value});
  },

  _handleOfferChange: function(e) {
    this.setState({offer: e.target.value});
  },
});

React.render(
  <Kumquat />,
  document.getElementById('root')
);
