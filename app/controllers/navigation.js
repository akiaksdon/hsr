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

    search: function() {
      if (this.allowSearch && this.searchRoute) {
        var currentRouteName = this.get('currentRouteName'),
          currentSearchText = this.get('currentSearchText'),
          textToFind = this.get('searchText');
        if (currentSearchText !== textToFind || currentRouteName.indexOf('.search') === -1) {
          this.set('searchText', '');
          this.set('progressMessage', 'Searching for ' + textToFind + '.  Please wait...');
          this.showProgressModal();
          this.transitionToRoute(this.searchRoute + '/' + textToFind);
        }
      }
    },

    navAction: function(nav) {
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
