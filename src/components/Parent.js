var React = require('react/addons');
var addons = require('react-addons');

var FriendsContainer = require('./Child')['friendsContainer'];

var App = React.createClass({
  getInitialState: function(){
    return {
      data: {
        1:{name:"Amos", destinations:[], _token:"dHVhbkBmbGV4cG9ydC5jb206amF2YTRldmE"}, 
        2:{name:"Andy", destinations:[], _token:"ffjds9f0ifjFJISDJSFJfj932e312fdjslf"}, 
        3:{name:"Evie", destinations:[], _token:"qQOEccxzcoisa34334ynurt33nkeiwrw342"}
      }
    }
  },
  componentDidMount: function(){
    loadInitialData(this);
    thiz = this;
    $("#forminput").submit(function(event){
      event.preventDefault();
      var id = $("#dropdownname").val();
      var destination = $("#destinationToAdd").val();
      var obj = {name: destination, visited: false};
      thiz.state.data[id].destinations.push(obj)
      thiz.setState({
        data: thiz.state.data
      })
    })

  },
  render: function(){
    return (
      <div>
        <h1> Travelers! </h1>
        <form id="forminput">
          <input id="destinationToAdd" type="text" />
          <select id="dropdownname" name="person">
            <option value="1">Amos</option>
            <option value="2">Andy</option>
            <option value="3">Evie</option>
          </select>
          <input type="submit" value="Add Destination"></input>
        </form>
        <ul>
          <FriendsContainer data={this.state.data} />
        </ul>
      </div>
    )
  }
});

function loadInitialData(context){
  thiz = context;
  $.ajax({
    type: "GET",
    url:'https://young-beyond-8772.herokuapp.com/travelers',
    dataType:"json",
    headers: {
      Authorization: "Token token=dHVhbkBmbGV4cG9ydC5jb206amF2YTRldmE",
      "Content-Type": "application/json"
    },
    success: function(result){
      for(var i = 0; i < result.length; i++){
        var newDestArr = result[i].destinations
        thiz.state.data[i+1].destinations = newDestArr
        thiz.setState({
          data: thiz.state.data
        })
      }
    }
  })
}


module.exports = App;