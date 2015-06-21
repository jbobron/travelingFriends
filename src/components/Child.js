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
      list.push(<li className='list-group-item'> 
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
        <h3 className='list-group-item-heading list-group-item active'>{this.props.data.name}</h3>
        <ul className='list-group' style={listStyle}>
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
            styles={VisitedStyle.checkbox}
            checked={this.props.data.visited ? true: false}
            type="checkbox" 
            name="isVisited"
            onClick={this.props.markVisited.bind(null, this.props.id, this.props.name)}  
            value=""/>
            {this.props.data.name}
          <button styles={VisitedStyle.button} onClick={this.props.deleteFromList.bind(null, this.props.id, this.props.name)}>x</button></p>
      </div>
    )
  }
});

var VisitedStyle = StyleSheet.create({
    normal: {
      'color': 'gray',
      'text-decoration': 'line-through'  
    },
    checkbox: {
      'display':'inline-block',
      'width':'19px',
      'height':'19px',
      'margin':'-1px 4px 0 0',
      'vertical-align':'middle',
      'background':'url(check_radio_sheet.png) left top no-repeat',
      'cursor':'pointer'
    },
    button:{
      'float':'right'
    }
    
});

module.exports = {
  location: Location,
  friend: Friend,
  friendsContainer: FriendsContainer
};