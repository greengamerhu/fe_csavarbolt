import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ftruncateSync } from 'fs';
import Popup from 'reactjs-popup';

interface State {
  postTipus : string,
  postKeszlet : number,
  postHossz: number,
  postAr: number,
  csavarok : Csavar[]
}

interface Csavar {
  id : number,
  tipus : string,
  hossz : number,
  keszlet : number,
  ar : number,
}
interface CsavarResponse {
  csavarok : Csavar[]
}



class App extends React.Component<{}, State> {
  constructor(props : {}) {
    super(props)
    this.state = {
      postTipus : "",
      postKeszlet : 0,
      postHossz: 0,
      postAr: 0,
      csavarok : []
    }
  }
  addToDB = async () => {
    const {postTipus, postKeszlet, postHossz, postAr} = this.state

      let csavar = {
        "tipus" : postTipus,
        "hossz" : postHossz, 
        "keszlet" : postKeszlet,
        "ar" : postAr
      };
      let response = await fetch("http://localhost:3000/csavar", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        } ,
        body : JSON.stringify(csavar)
        
      })
      this.loadData()
  }

  loadData = async () => {
    let response = await fetch("http://localhost:3000/csavar") 
    let data = await response.json() as CsavarResponse
    this.setState({
      csavarok : data.csavarok
    })
   }
   componentDidMount(): void {
     this.loadData()
   }


   deleteFromDatabase = async (id : number)  => {
    await fetch('http://localhost:3000/csavar/'+ id, {
      method : 'DELETE'
    })
    this.loadData()
  }


  popUprendeles = async (id : number) => {
    
  }
   render() {
    const {postTipus, postKeszlet, postHossz, postAr} = this.state
    const PopupExample = () => (  <Popup trigger={<button> Trigger</button>} position="right center">   
     <div>Popup content here !!</div>  </Popup>);
    return <div>
      <div className='container'>
          <div className='row justify-content-center' >
            <div className="col-sm-4 text-center">
                Csavar Típusa :  <br />  <input type="text" value={postTipus} onChange={e => this.setState({postTipus : e.currentTarget.value})} />       
             </div>

          </div>
          <div className='row justify-content-center' >
            <div className="col-sm-4 text-center">
                Csavar hossza (mm) : <br /> <input type="number" min={0} value={postHossz} onChange={e => this.setState({postHossz : parseInt(e.currentTarget.value)})} />
            </div>

          </div>
          <div className='row justify-content-center' >
            <div className="col-sm-4 text-center">
                Készlet (db) : <br /> <input type="number" min={0} value={postKeszlet} onChange={e => this.setState({postKeszlet : parseInt(e.currentTarget.value)})} />
            </div>

          </div>
          <div className='row justify-content-center' >
            <div className="col-sm-4 text-center"> 
              Ár($) : <br /> <input type="number" min={1} value={postAr} onChange={e => this.setState({postAr : parseFloat(e.currentTarget.value)})} />
            </div>
          </div>
          <div className='row justify-content-center mt-3  ' >
            <div className="col text-center "> 
            <button className='btn btn-secondary ' onClick={this.addToDB}>Felvesz</button> <br />
            <button className='btn btn-secondary ' onClick={PopupExample}>Rendelés</button> <br />
          
            </div>
          </div>
          <div className='row justify-content-center mt-3  ' >
            <div className="col text-center "> 
            <p className='text-danger'>{}</p>          
            </div>
          </div>
         
        </div>
        <div className='row'>
          {this.state.csavarok.map(item => (
            <div className='col-md-4'>
              <div className="card text-center">
                <div className="card-body">
                  Tipus: {item.tipus} <br />
                  Hossz: {item.hossz} mm <br />
                  Készlet : {item.keszlet} db <br />
                  Ár: {item.ar} $
                  </div>
                <div className='card-footer'>
                    <button onClick={(event) => this.deleteFromDatabase(item.id)}>Törlés</button>
                </div>
            </div>
          </div>
          ))}
          </div>
          
      
    
      
      </div>

   }

   
}

export default App;
