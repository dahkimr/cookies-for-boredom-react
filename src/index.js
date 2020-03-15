import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Site extends React.Component {
   render() {
      return (
         <div>
            <h1>Bored?</h1>
            <h2>Take a cookie!</h2>
            <img id="cookie-jar" src={require('./assets/cookie_jar.svg')} />
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
