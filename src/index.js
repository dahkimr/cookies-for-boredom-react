import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CookieMessage extends React.Component {

   render() {
      return (
         <img id="cookie-message" src={require('./assets/cookie.svg')} />
      );
   }
}

class Site extends React.Component {

   constructor(props) {
      super(props);
      this.state = {showMessage: false};
      this.onJarBtnClick = this.onJarBtnClick.bind(this);
   }

   onJarBtnClick(e) {
      e.preventDefault();
      this.setState(state => ({
         showMessage: true
      }));
   }

   render() {
      return (
         <div>
            <h1>Bored?</h1>
            <h2>Take a cookie!</h2>
            <div className="container">
               <img src={require('./assets/cookie_jar.svg')} />
               <button className="button" type="button" onClick={this.onJarBtnClick}>Take</button>
               <CookieMessage />
            </div>
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
