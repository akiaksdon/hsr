import Ember from 'ember';
var LoginController = Ember.Controller.extend({/*Extended Ember Controller into LoginController chutya*/
  session: Ember.inject.service(),/*Session created for the page to display using ember*/
  errorMessage: null,/*INIT*/
  identification: null,/*INIT*/
  password: null,/*INIT*/

  actions: {/* Actions to be defined after performing clicks on the page*/
    authenticate() {/*Authenticate function begins*/
      let { identification, password } = this.getProperties('identification', 'password');/* caught parameters from the page and stored locally */
      this.get('session').authenticate('authenticator:custom', {//Authenticate the session using custom authentication provided in hsr/app/authenticators/
        identification: identification,//locally storing values returned from the page
        password: password//locally storing values returned from the page
      }).catch((error) => {//try catch block for safe exit and error display **USEFUL FOR DEBUGGIN**
        this.set('errorMessage', error.reason);//catching the error in error.reason variable
      });//EOcatch
    }//EOauthenticate
  }//EOActions Block
});//EOLoginController

export default LoginController;//Keep LoginController to be resuable within the code
