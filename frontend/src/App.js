import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {
  state = {
    pics: [],
    imageUrl: ""
  };

   async componentDidMount(){
     let pics = await axios.get('http://localhost:5000/allPics')
     console.log(pics)
     this.setState({pics:pics.data.allPics})
   }


   showPics = () => {
     return this.state.pics.map(eachPic => {
       return <img src={eachPic.imageUrl}/>
     })
   }

    handleFileUpload = e => {
      console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append("imageUrl", e.target.files[0]);
      
      return axios.post('http://localhost:5000/upload', uploadData)
      .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.data.secure_url });
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
  }



  render() {
    return (
      <div>
        <h2>New Thing</h2>
        {this.showPics()}
        <img width="500px" height="500px" src={this.state.imageUrl} />
            <input 
                type="file" 
                onChange={(e) => this.handleFileUpload(e)} /> 

                
      </div>
    );
}
}

export default App;

