

var Kumquat = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          Welcome to Kumquat
        </div>
        <button>
          Get started
        </button>
      </div>
    );
  },
});

React.render(
  <Kumquat />,
  document.getElementById('root')
);
