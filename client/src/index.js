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
         .then(res => this.setState({ apiResponse: res.message, showCookie: true}));
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
         <div>
            <h1>Bored?</h1>
            <h2>Take a cookie!</h2>
            <div className="container">
               <img src={require('./assets/cookie_jar.svg')} alt="cookie jar" />
               <button className="take-btn button" type="button" onClick={this.onJarBtnClick}>Take</button>
               {this.state.showCookie ?
                  <CookieMessage message={this.state.apiResponse} showCookie={this.state.showCookie}
                     hideCookie={this.hideCookie}/> : null
               }
               {this.state.showInputCookie ?
                  <CookieInput showCookie={this.state.showInputCookie}
                     hideCookie={this.hideInputCookie}/> : null
               }
            </div>
            <AddCookieBtn onCookieClick={this.onAddCookieClick} />
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
            <img className="cookie" src={require('./assets/cookie.svg')} alt="cookie" />
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
            this.setState({value: ''});
            this.props.hideCookie();
         });
   }

   render() {
      return (
         <div ref={node => this.node = node} className={this.props.showCookie ? null: "hidden"}>
            <img className="cookie" src={require('./assets/cookie.svg')} alt="cookie" />
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

class AddCookieBtn extends React.Component {

   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(e) {
      e.preventDefault();
      this.props.onCookieClick();
   }

   render() {
      return (
         <div className="cookie-btn-container" onClick={this.handleClick}>
            <img className="cookie-btn" src={require('./assets/cookie.svg')} alt="small cookie" />
            <div className="cookie-btn">Add</div>
         </div>
      );
   }
}

ReactDOM.render(<Site />, document.getElementById("root"));
