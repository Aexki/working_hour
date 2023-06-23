import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // const [value, setValue] = 
    
      //  const onChange = (timeValue) => {
      //     setValue(timeValue);
      //  }
      const [time, setTime] = useState('10:00')
       
    
       return (
        <>
          <table>
            <tr>
              <th>day</th>
              <th>morning</th>
              <th>closed</th>
            </tr>
            <tr>
              <td>
                monday
              </td>
              <td>
                <input type='time'/> 
              </td>
              <td>
                <input type='checkbox'/>closed
              </td>
            </tr>
          </table>
          <button className='primaryButton' >
            submit
          </button>
        </>
       );
}

export default App;
