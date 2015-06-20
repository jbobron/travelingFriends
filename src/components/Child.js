var React = require('react');

var FriendsContainer = React.createClass({
  render: function() {
    var list = []
    for(var key in this.props.data){
      list.push(<li> <Friend data={this.props.data[key]}/> </li>); 
    }
    return (
      <div>
        {list}
      </div>
    );
  }

});

var Friend = React.createClass({
  render: function() {
    var list = []
    for(var i = 0; i < this.props.data.destinations.length; i++){
      list.push(<li> <Location data={this.props.data.destinations[i]}/> </li>)
    }
    return (
      <div>
        <h3>{this.props.data.name}</h3>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
});

var Location = React.createClass({

  render: function() {
    return(
      <div>
        <p><input type="checkbox" name="isVisited" value=""/>{this.props.data.name}<button>x</button></p>
      </div>
    )
  }
});


module.exports = {
  location: Location,
  friend: Friend,
  friendsContainer: FriendsContainer
};