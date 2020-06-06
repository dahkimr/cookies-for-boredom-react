import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Site extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         showCookie: false,
         showInputCookie: false,
         apiResponse: ""
      };

      this.onJarBtnClick = this.onJarBtnClick.bind(this);
      this.onAddCookieClick = this.onAddCookieClick.bind(this);
      this.hideCookie = this.hideCookie.bind(this);
      this.hideInputCookie = this.hideInputCookie.bind(this);
   }

   onJarBtnClick(e) {
      e.preventDefault();

      // retreive from server
      fetch("http://localhost:9000/cookie")
         .then(res => res.json())
         .then(res => {
            if (!res.error) {
               console.log('cookie was successfully retrieved');
               this.setState({ apiResponse: res.message, showCookie: true});
            }
            else {
               // show error
               alert('Error occurred grabbing cookie.');
               console.log(res.error);
            }
         });
   }

   onAddCookieClick(e) {
      this.setState(state => ({
         showInputCookie: true
      }));
   }

   hideCookie() {
      this.setState(state => ({
         showCookie: false
      }));
   }

   hideInputCookie() {
      this.setState(state => ({
         showInputCookie: false
      }));
   }

   render() {
      return (
         <div className="parent-container">
            <h1>Bored?</h1>
            <h2>Take a cookie!</h2>
            <div className="container">
               <img className="cookie-jar" src={require('./assets/cookie_jar.png')} alt="cookie jar" />
               <button className="take-btn button" type="button" onClick={this.onJarBtnClick}>Grab a cookie</button>
               <button className="add-btn button" type="button" onClick={this.onAddCookieClick}>Add a cookie</button>
               {this.state.showCookie ?
                  <CookieMessage message={this.state.apiResponse} showCookie={this.state.showCookie}
                     hideCookie={this.hideCookie}/> : null
               }
               {this.state.showInputCookie ?
                  <CookieInput showCookie={this.state.showInputCookie}
                     hideCookie={this.hideInputCookie}/> : null
               }
            </div>
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

   componentDidMount() {
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
      this.props.hideCookie();
   }

   render() {
      return (
         <div ref={node => this.node = node} className={this.props.showCookie ? null: "hidden"}>
            <img className="cookie" src={require('./assets/cookie.png')} alt="cookie" />
            {/* placeholder message
            should randomly be taken from database */}
            <div className="cookie"><span>{this.props.message}</span></div>
         </div>
      );
   }
}

class CookieInput extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         value: ''
      };

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) {
      this.setState({value: event.target.value});
   }

   handleSubmit = (event) => {
      event.preventDefault();
      this.setState({value: event.target.value});

      const requestOptions = {
         method: "Post",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ message: this.state.value })
      }

      fetch("http://localhost:9000/cookie", requestOptions)
         .then(res => res.text())
         .then(res => {
            if (!res.error) {
               console.log('cookie was successfully added');
               this.setState({value: ''});
               this.props.hideCookie();
            }
            else {
               // show error
               alert('Error occurred adding cookie.');
               console.log(res.error);
            }
         });
   }

   render() {
      return (
         <div ref={node => this.node = node} className={this.props.showCookie ? null: "hidden"}>
            <img className="cookie" src={require('./assets/cookie.png')} alt="cookie" />
               <form onSubmit={this.handleSubmit}>
               <textarea className="cookie" rows="3" cols="25"
                  value={this.state.value} onChange={this.handleChange}>
               </textarea>
               <input type="submit" className="cookie button"></input>
               </form>
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
