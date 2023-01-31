import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

interface State {
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
      csavarok : []
    }
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
   render() {
    return <div>
        <div className='row'>
          {this.state.csavarok.map(item => (
            <div className='col-md-4'>
              <div className="card text-center">
                <div className="card-body">
                  tipus: {item.tipus} <br />
                  hossz: {item.hossz} mm <br />
                  keszlet : {item.keszlet} db <br />
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
