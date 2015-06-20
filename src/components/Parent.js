var React = require('react/addons');
var addons = require('react-addons');

var ShowList = require('./Child');

var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      friends: [{name:'Amos', locations:[]}, {name:'Andy', locations:[]}, {name:'Evie', locations:[]}],
      data: []
    }
  },
  componentDidMount: function(){
    thiz = this;
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
          var obj = {};
          obj['destinations'] = result[i].destinations
          obj['name'] = result[i].name
          if(obj['name'] === "amos") obj['id'] = 1;
          if(obj['name'] === "andy") obj['id'] = 2;
          if(obj['name'] === "evie") obj['id'] = 3;
          console.log(obj)
          thiz.setState({data: thiz.state.data.concat([obj])});
          console.log(thiz.state.data)
        }

      }
    })
    $("#forminput").submit(function(event){
      event.preventDefault();
      var name = $("#dropdownname").val();
      var destination = $("#destinationToAdd").val();
      var id = null;
      var token = null;
      console.log(name, destination, typeof(destination))
      //make post request here to get token for post request
      var objForUpdate = { data: [ {name:"amos", id:1, "destinations":[]}, {name:"andy", id:2, destinations:[]}, {name:"evie", id:3,destinations:[]} ] };
      console.log(objForUpdate.data[0])
      $.ajax({
        type: "POST",
        url:'https://young-beyond-8772.herokuapp.com/auth',
        dataType:"json",
        data: { name: name },
        success: function(data){
          console.log("Success")
          id = data.id;
          token = data.token;
          // objForUpdate.data[id-1].destinations: {$push: [destination]};
          // var obj = {0:{destinations}}
          var newData = React.addons.update( thiz.state.data, {0: {'destinations':{$push:[destination]}}});
          var data = React.addons.update( thiz.state, newData )
          thiz.setState( data );
        }
      })

    })
    console.log("STATE:", this.state)
    
  },
  render: function(){
    return (
      <div>
        <h1> Travelers! </h1>
        <form id="forminput">
          <input id="destinationToAdd" type="text" />
          <select id="dropdownname" name="person">
            <option value="amos">Amos</option>
            <option value="andy">Andy</option>
            <option value="evie">Evie</option>
          </select>
          <input type="submit" value="Add Destination"></input>
        </form>
        <ShowList data={this.state.data} />
      </div>
    )
  }
});

module.exports = FriendsContainer;