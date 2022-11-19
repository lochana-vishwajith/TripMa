import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import LiveLocation from "../app/Components/LiveLocation";

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      console.log("token fetched");
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};

export const Login = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  // dispatchLoader(spinnerLoader(false));
};

export const GetAvailableBuddies = () => {
  return async (dispatch) => {
    const buddies = await axios.get(
      "https://travel-buddy-research.herokuapp.com/buddy/allbuddies"
    );
    dispatch({
      type: "GETAVAILABLEBUDDIES",
      payload: buddies.data,
    });
  };
};

export const LogoutUser = () => {
  return async (dispatch) => {
    console.log("logout dispatch");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const StoreRegisterDetails = (value) => {
  return async (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "STOREREGISTERDETAILS",
      payload: value,
    });
  };
};

export const StoreDestinationDetails = (value) => {
  return async (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "SETDESTINATION",
      payload: value,
    });
  };
};

export const SpinnerLoader = (value) => {
  return async (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "SPINNERLOADER",
      payload: value,
    });
  };
};

export const SetSugestionsforSafety = (value) => {
  return async (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "SAFETYSUGGESTIONS",
      payload: value,
    });
  };
};

export const showLiveUpdateModal = () => {
  return (dispatch) => {
    console.log("showLiveUpdateModal Invoked 1");
    dispatch({
      type: "MODAL_SET_ID",
      payload: true,
    });
  };
};

export const hideLiveUpdateModal = (val) => {
  return (dispatch) => {
    console.log("HideLiveUpdateModal Invoked");
    dispatch({
      type: "MODAL_SET_ID",
      payload: val,
    });
  };
};

export const CrowdModalIterate = () => {
  console.log("Interval working");
  setInterval(() => {
    showLiveUpdateModal(true);
  }, 6000);
};

export const SetLiveLocation = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "LIVELOCATION",
      payload: value,
    });
  };
};

export const SetPreferencesValues = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "PREFERENCES",
      payload: value,
    });
  };
};

export const GetUserDetails = (userId) => {
  console.log("user details getting");
  return async (dispatch) => {
    const user = await axios.get(
      `https://travel-buddy-research.herokuapp.com/user/getUserDetails/${userId}`
    );
    console.log("user data : ", user.data);
    dispatch({
      type: "USERDETAILS",
      payload: user.data,
    });
  };
};

export const setTripDate = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "TRIPDATE",
      payload: value,
    });
  };
};

export const selectPlaceForSecurity = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "PLACESECURITY",
      payload: value,
    });
  };
};
export const setMyBuddyRequests = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "MYREQUEST",
      payload: value,
    });
  };
};

export const SetAttractionPreferences = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "ATTRACTION_PREFERENCES",
      payload: value,
    });
  };
};

export const GetLiveLocation = () => {
  console.log("Live Location Action");
  return async (dispatch) => {
    const location = await LiveLocation();
    console.log("Live Location AC:", location);
    dispatch({
      type: "LIVELOCATIONACTION",
      payload: location,
    });
  };
};

export const updatePreferenceCreated = (value) => {
  return async (dispatch) => {
    console.log("value updatePreferenceCreated", value);
    dispatch({
      type: "UPDATEPREFERENCEUSER",
      payload: value,
    });
  };
};

export const setMyCurrentCompanionships = (value) => {
  return async (dispatch) => {
    console.log("value companionships", value);
    dispatch({
      type: "COMPANIONSHIPS",
      payload: value,
    });
  };
};

export const setLocationDetials = (value) => {
  return async (dispatch) => {
    console.log("value companionships", value);
    dispatch({
      type: "LOCATIONS",
      payload: value,
    });
  };
};
