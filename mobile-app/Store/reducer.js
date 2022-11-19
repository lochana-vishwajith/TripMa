const initialState = {
  authToken: null,
  userDetails: {},
  registerDetails: {},
  buddies: [],
  isSpinnerLoaded: false,
  safetySugestion: {},
  liveUpdateModalState: false,
  appLoader: false,
  destination: {},
  liveLocation: {},
  preferences: {},
  requestDetails: {},
  attractionPreferences: {},
  locationLive: {},
  safetyLocationSelector: {},
  myRequests: [],
  preferenceProfileDetails: {},
  myCompanionships: [],
  locationDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, //copy previous state
        authToken: action.payload.token,
        userDetails: action.payload.userDetails,
      };
    case "SPINNERLOADER":
      return {
        ...state, //copy previous state
        isSpinnerLoaded: action.payload,
      };
    case "GETAVAILABLEBUDDIES":
      return {
        ...state, //copy previous state
        buddies: action.payload,
      };
    case "STOREREGISTERDETAILS":
      return {
        ...state, //copy previous state
        registerDetails: action.payload,
      };
    case "MODAL_SET_ID": {
      return {
        ...state, //copy previous state
        liveUpdateModalState: action.payload,
      };
    }
    case "LOGOUT":
      return {
        userDetails: {},
        authToken: null,
      };
    case "SETDESTINATION":
      return {
        ...state,
        destination: action.payload,
      };
    case "SAFETYSUGGESTIONS": {
      return {
        ...state,
        safetySugestion: action.payload,
      };
    }
    case "PREFERENCES": {
      return {
        preferences: action.payload,
      };
    }
    case "LIVELOCATION": {
      return {
        ...state,
        liveLocation: action.payload,
      };
    }
    case "USERDETAILS": {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case "APPLOADER": {
      return {
        ...state,
        appLoader: action.payload,
      };
    }
    case "TRIPDATE": {
      return {
        ...state,
        requestDetails: action.payload,
      };
    }
    case "ATTRACTION_PREFERENCES": {
      return {
        ...state,
        attractionPreferences: action.payload,
      };
    }
    case "LIVELOCATIONACTION": {
      return {
        ...state,
        locationLive: action.payload,
      };
    }
    case "MYREQUEST": {
      return {
        ...state,
        myRequests: action.payload,
      };
    }
    case "PLACESECURITY": {
      return {
        ...state,
        safetyLocationSelector: action.payload,
      };
    }
    case "UPDATEPREFERENCEUSER": {
      return {
        ...state,
        preferenceProfileDetails: action.payload,
      };
    }
    case "COMPANIONSHIPS": {
      return {
        ...state,
        myCompanionships: action.payload,
      };
    }
    case "LOCATIONS": {
      return {
        ...state,
        locationDetails: action.payload,
      };
    }

    default:
      return state;
  }
};
