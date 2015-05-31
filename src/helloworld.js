

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

  componentDidMount: function() {
     $(".introRoot h1:first-of-type").typed({
              strings: ["^500 Hi, we're Kumquat."],
              typeSpeed: 0,
              showCursor: false
            });
      $(".introRoot h1:last-of-type").typed({
          strings: ["^2000 We'll help you with your immigration situation."],
          typeSpeed: 0,
          showCursor: false
        });

    setTimeout(function() {
      $('.hidden-button').removeClass('hidden-button').addClass('fadeIn').focus();
    }, 100);

      setTimeout(function() {
      $('.hidden-nav').removeClass('hidden-nav').addClass('slideDown');
    }, 4500);
   },
  render: function() {
    return (
      <div className="introRoot fadeIn">
      <img className = "logo" src="kumquat.png"/>

        <h1>
        </h1>
        <h1>
        </h1>
        <br />
        <button className="btn btn-default hidden-button"
          onClick={this.props.onClick}>
          Get started
        </button>
      </div>
    );
  },
});



var KumquatMain = React.createClass({
  getInitialState: function() {
    return {stage: 'country', confidence: '0%'};
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
    setTimeout(function() {
      $('.slideDown').removeClass('slideDown').addClass('slideUp');
    }, 0);
    setTimeout(function() {
      $('.slideUp').addClass('hidden-nav');
    }, 1000);
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

  componentWillUpdate: function(nextProps, nextState) {
    var confidence = 0;
    if (nextState.country === 'North Korea.') {
      confidence = 0;
    } else {
      confidence = 0.5;
    }
    this._confidence = 100*confidence+'%';
  },

  render: function() {
    return (
      <div className="mainRoot fadeIn">
        <h1 className="fadeIn2">
          My country of citizenship is
        </h1>
        <div className="fadeIn2" id="prefetch">
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
        <div className="progress">
          <div className="progress-bar" role="progressbar"
          aria-valuemin="0" aria-valuemax="100" style={{width:this._confidence}}>
          </div>
        </div>
      </div>
    );
  },

  _renderPurpose: function() {
    if (this.state.stage === 'purpose') {
      return (
        <div className="fadeIn2">
        <h1> I want to come to the US to</h1>
        <select id="purpose" className="form-control" onChange={this._handlePurposeChange} value={this.state.purpose}>
          <option selected={!this.state.purpose} disabled hidden value=''></option>
          <option value="work">work.</option>
          <option value="study">study.</option>
          <option value="visit">visit.</option>
          <option value="invest">invest.</option>
          <option value="live">live permanently.</option>
        </select>
        </div>
      );
    }
    return null;
  },

  _renderStudy: function() {
    if (this.state.purpose === 'study') {

      var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remotesVideos',
        // immediately ask for camera access
        autoRequestMedia: true
      });
      webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom('kumquatstudy');
      });
      return (
        <div className="fadeIn2">
        <h1> Get an F visa.</h1> <br />
        <h1> If you're doing a vocational program, then you'll need an M visa</h1>
        <video height="100" id="localVideo"></video>
        <div id="remotesVideos"></div>
        </div>
      );
    }

    if (this.state.purpose === 'work') {
      return (
        <div className="fadeIn2">
        <h1> The highest degree I've completed is</h1>
        <select id="degree" className="form-control" onChange={this._handleStudyChange} value={this.state.study}>
          <option selected={!this.state.study} disabled hidden value=''></option>
          <option value="highschool">high school or lower.</option>
          <option value="bachelors">Bachelor's.</option>
          <option value="masters">Master's or higher.</option>
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
        <div className="fadeIn2">
        <h1> Go back to school</h1>
        </div>
      );
    }

    if (this.state.study === 'bachelors' || this.state.study === 'masters') {
      return (
        <div className="fadeIn2">
        <h1>I</h1>

        <select id="offer" className="form-control" onChange={this._handleOfferChange} value={this.state.offer}>
          <option selected={!this.state.offer} disabled hidden value=''></option>
          <option value="offer">have an offer from a US employer.</option>
          <option value="transfer">am transferring to a US branch of my current company.</option>
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
      if (this.state.country === 'Mexico.' || this.state.country === 'Canada.') {
        return (
          <div>
          <div className="fadeIn2">
            <h1>Get a TN or H1B visa</h1>
          </div>
         <video height="100" id="localVideo"></video>
        <div id="remotesVideos"></div>
            <div id= "loader1" className="fadeIn loader-inner ball-scale-multiple hidden-button showLoader">
              <div></div>
              <div></div>
              <div></div>

            </div>
            <div id = "loader2" className="loader-inner connecting hidden-button showLoader">
              <h2>Connecting...</h2>

            </div>
            <br />
            <button id="callButton" className = "btn fadeIn2 btn-default" onClick={this._handleCall}>Call an experienced attorney</button>
          
            </div>
        );
      }
      return (
        <div className="fadeIn2">
          <h1>Get an H1B visa</h1>
        </div>
      );
    }

    if (this.state.offer === 'transfer') {
      return (
        <div className="fadeIn2">
          <h1>Get an L1A visa</h1>
        </div>
      );
    }

    return null;
  },

  _handleCall: function(e) {
    $('#callButton').addClass('hidden-button');

            setTimeout(function() {
          $('.fadeIn2').addClass('fadeOut');
        }, 100);
            setTimeout(function() {
          $('.fadeIn2').addClass('hidden-button');
        }, 1100);

          setTimeout(function() {
            $('.loader-inner').removeClass('hidden-button');
          }, 1300);

          setTimeout(function() {
              $('.loader-inner').addClass('fadeOut');
            }, 4000);
        setTimeout(function() {
              $('.loader-inner').addClass('hidden-button');
            }, 5000);
        setTimeout(function() {

              var webrtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'remotesVideos',
            // immediately ask for camera access
            autoRequestMedia: true
          });
          webrtc.on('readyToCall', function () {
            // you can name it anything
            webrtc.joinRoom('kumquattn');
          });

        }, 5000);
     

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
