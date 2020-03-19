import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CookieMessage extends React.Component {

   render() {
      return (
         <div>
            <img class="cookie" src={require('./assets/cookie.svg')} />
            {/* placeholder message
            should randomly be taken from database */}
            <div class="cookie"><span>Draw a watercolour of your dog.</span></div>
         </div>
      );
   }
}

class Site extends React.Component {

   constructor(props) {
      super(props);
      this.state = {showCookie: false};
      this.onJarBtnClick = this.onJarBtnClick.bind(this);
   }

   onJarBtnClick(e) {
      e.preventDefault();
      this.setState(state => ({
         showCookie: true
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
               {this.state.showCookie ? <CookieMessage /> : null}
            </div>
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
