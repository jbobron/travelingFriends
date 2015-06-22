var React = require('react');
var StyleSheet = require('react-style');

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
  markVisited: function(index, name){
    id = getIdForName(name);
    this.state.data[id].destinations[index].visited = !this.state.data[id].destinations[index].visited
    this.setState({ data: this.state.data })
    console.log(this.state.data[id].destinations[index].visited)
  },
  deleteFromList: function(index, name){
    id = getIdForName(name);
    this.state.data[id].destinations.splice(index, 1);
    this.setState({ data: this.state.data })
  },
  render: function(){
    var listStyle = {
      'list-style-type': 'none'
    }
    return (
      <div>
        <h1> Travel Notes </h1>
        <form id="forminput">
          <label> New Destination</label><br></br>
          <input styles={VisitedStyle.input} id="destinationToAdd" type="text" />
          <select className="form-control" id="dropdownname" name="person">
            <option value="1">Amos</option>
            <option value="2">Andy</option>
            <option value="3">Evie</option>
          </select>
          <input styles={VisitedStyle.button} type="submit" value="Add Destination"></input>
        </form>
        <ul className='list-group' style={listStyle}>
          <FriendsContainer 
            deleteFromList={this.deleteFromList} 
            markVisited={this.markVisited} 
            data={this.state.data} 
          />
        </ul>
      </div>
    )
  }
});
function getIdForName(name){
  var id;
  if(name === "Amos") id = 1;
  if(name === "Andy") id = 2;
  if(name === "Evie") id = 3;
  return id;
}
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

var VisitedStyle = StyleSheet.create({
    button:{
      'background': '#333333',
      'border-radius': '4.5px',
      'color':'white',
      'width':'100%',
      'margin-top':'5px',
      'margin-bottom':'5px',
      'padding': '5px'
    },
    input:{
      'margin-top':'5px',
      'margin-bottom':'5px',
      'padding': '5px',
      'border-radius': '4.5px',
      'width': '100%'
    }
});

module.exports = App;