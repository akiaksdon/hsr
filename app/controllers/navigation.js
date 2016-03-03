import Ember from 'ember';//Ember imported
import HospitalRunVersion from 'hospitalrun/mixins/hospitalrun-version';//importing about from the location
import ModalHelper from 'hospitalrun/mixins/modal-helper';//importing about from the location
import ProgressDialog from 'hospitalrun/mixins/progress-dialog';//importing about from the location
import UserSession from 'hospitalrun/mixins/user-session';//importing about from the location
import Navigation from 'hospitalrun/mixins/navigation';//importing about from the location
export default Ember.Controller.extend(HospitalRunVersion, ModalHelper, ProgressDialog, UserSession, Navigation, {//Exporting enable for the feature to be called within any code
  application: Ember.inject.controller(),//Controller injected to the applications
  allowSearch: false,//Setting search functionality off by default as not needed
  config: Ember.inject.service(),//Injecting config with Ember service
  currentSearchText: null,//Search off as not reqd
  currentRouteName: Ember.computed.alias('application.currentRouteName'),//The current route mentioned in the route folder
  progressTitle: 'Searching',//Searching sent to the ProgressTitle 
  searchRoute: null,//No Search Route
  session: Ember.inject.service(),//Session injected with Ember.service.
  syncStatus: '',//**NO IDEA**
  currentOpenNav: null,//**NO IDEA**

  actions: {
    about: function() {//opening about function
      let config = this.get('config'),//Locally importing config from above code
          version = this.get('version');//version imported from above code
      config.getConfigValue('site_information', '').then((siteInfo) => {//site_information retrieved from HTML and stored to a variable
        let message = `Version: ${version}`;//Storing version details into message
        if (!Ember.isEmpty(siteInfo)) {//If ember.siteInfo not empty then append to message
          message += ` Site Info: ${siteInfo}`;
        }
        this.displayAlert('About HospitalRun', message);//display details on screen.
      });
    },

    invalidateSession: function() {// Logout block
      const session = this.get('session');//constant session stored current session value
      if (session.get('isAuthenticated')) {//if authenticated i.e. logged in then logout
        session.invalidate();//LOGOUT
      }
    },

    search: function() {//allow search functionality
      if (this.allowSearch && this.searchRoute) {//If allow search and search Route is enables for the current session
        var currentRouteName = this.get('currentRouteName'),//get RouteName from HTML and store to CurrentRouteName
          currentSearchText = this.get('currentSearchText'),//get Current search text entered and store to CurrentsearchText
          textToFind = this.get('searchText');//To find the current txt from HTML to texttofind variable
        if (currentSearchText !== textToFind || currentRouteName.indexOf('.search') === -1) {//if the Currentsearchtext is not equla to text to find or the cureent Route does not have the .search value in the first line then execute IF( === is comparison in JS)
          this.set('searchText', '');//set Searchtext to the current session
          this.set('progressMessage', 'Searching for ' + textToFind + '.  Please wait...');//displaying the following message
          this.showProgressModal();//Progress Modal call
          this.transitionToRoute(this.searchRoute + '/' + textToFind);//show the Route to find
        }
      }
    },

    navAction: function(nav) {//NaAction to 
      if (this.currentOpenNav && this.currentOpenNav.route !== nav.route) {
        this.currentOpenNav.closeSubnav();
      }
      this.currentOpenNav = nav;
      this.transitionToRoute(nav.route);
      this.set('isShowingSettings', false);
    },

    toggleSettings: function() {
      this.toggleProperty('isShowingSettings');
    },

    closeSettings: function() {
      this.set('isShowingSettings', false);
    }

  }
});
