import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

   hideCookie() {
      this.setState(state => ({
         showCookie: false
      }));
   }

   render() {
      return (
         <div>
            <h1>Bored?</h1>
            <h2>Take a cookie!</h2>
            <div className="container">
               <img src={require('./assets/cookie_jar.svg')} alt="cookie jar" />
               <button className="button" type="button" onClick={this.onJarBtnClick}>Take</button>
               {this.state.showCookie ?
                  <CookieMessage showCookie={this.state.showCookie}
                     hideCookie={() => this.hideCookie()}/> : null
               }
            </div>
            <AddCookieBtn />
         </div>
      );
   }
}

class CookieMessage extends React.Component {

   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
   }

   componentWillMount() {
      document.addEventListener('mousedown', this.handleClick, false);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClick, false);
   }

   handleClick(e) {
      if (this.node.contains(e.target)) {
         return;
      }

      this.handleClickOutside();
   }

   handleClickOutside() {
      console.log('was clicked outside of cookie');
      this.props.hideCookie();
   }

   render() {
      return (
         <div ref={node => this.node = node} className={this.props.showCookie ? null: "hidden"}>
            <img className="cookie" src={require('./assets/cookie.svg')} alt="cookie" />
            {/* placeholder message
            should randomly be taken from database */}
            <div className="cookie"><span>Draw a watercolour of your dog.</span></div>
         </div>
      );
   }
}

class AddCookieBtn extends React.Component {

   render() {
      return (
         <div className="cookie-btn-container">
            <img className="cookie-btn" src={require('./assets/cookie.svg')} alt="small cookie" />
            <div className="cookie-btn">Add</div>
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
