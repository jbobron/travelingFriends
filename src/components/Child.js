var React = require('react');
var StyleSheet = require('react-style');

var FriendsContainer = React.createClass({
  render: function() {
    var list = [];
    for(var key in this.props.data){
      list.push(<li> <Friend markVisited={this.props.markVisited} deleteFromList={this.props.deleteFromList} data={this.props.data[key]}/> </li>); 
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
    var list = [];
    for(var i = 0; i < this.props.data.destinations.length; i++){
      list.push(<li> 
                  <Location id={i}
                    name= {this.props.data.name} 
                    deleteFromList= {this.props.deleteFromList}  
                    markVisited= {this.props.markVisited} 
                    data= {this.props.data.destinations[i]}/> 
                </li>)
    }
    var listStyle = {
      'list-style-type': 'none'
    }
    return (
      <div>
        <h3>{this.props.data.name}</h3>
        <ul style={listStyle}>
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
        <p styles={this.props.data.visited ? VisitedStyle.normal : ""}>
        <input
            checked={this.props.data.visited ? true: false}
            type="checkbox" 
            name="isVisited"
            onClick={this.props.markVisited.bind(null, this.props.id, this.props.name)}  
            value=""/>
            {this.props.data.name}
          <button onClick={this.props.deleteFromList.bind(null, this.props.id, this.props.name)}>x</button></p>
      </div>
    )
  }
});

var VisitedStyle = StyleSheet.create({
    normal: {
        'color': 'gray',
        'text-decoration': 'line-through'  
    }
});


module.exports = {
  location: Location,
  friend: Friend,
  friendsContainer: FriendsContainer
};