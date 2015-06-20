var React = require('react');

var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.data.map(function(obj){
      return (<li> 
                <h2>{obj.name}</h2> 
                <Destinations destinations={obj.destinations}/>
              </li>

            );
    });
    return (
      <div>
        <h3> </h3>
        <ul>
            {listItems}
        </ul>
      </div>
    )
  }
});


var Destinations = React.createClass({

  render: function() {
    var listItems = this.props.destinations.map(function(destination){
      return <li>{destination}</li>;
    });
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

});


module.exports = ShowList;