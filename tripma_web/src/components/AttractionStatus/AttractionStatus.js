import React from "react";
import "./AttractionStatus.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import { Slider } from "rsuite";
import axios from "axios";
import { Button } from "react-bootstrap";

const clabels = ["LOW", "", "", "", "", "AVG", "", "", "", "", "HIGH"];
const wlabels = ["RAIN", "", "", "", "", "CLOUDS", "", "", "", "", "SUNNY"];

export default function AttractionStatus() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [value, setValue] = useState(0);
  const [weather, setWather] = useState(0);

  const [open, setOpen] = useState();
  const [visit, setVisit] = useState();
  const [type, setType] = useState();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    console.log(ll);
    setAddress(value);
    setCoordinates(ll);
  };

  const handleSubmit = async () => {
    const uploadDetails = {
      location: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      date: new Date(),
      crowd: value,
      openStatus: open,
      weather: weather,
      visit: visit,
      placeType: type,
    };
    console.log(uploadDetails);

    await axios
      .post(
        "https://travel-buddy-research.herokuapp.com/liveCrowd",
        uploadDetails
      )
      .then((result) => {
        console.log("result ", result);
        if (result.status === 200) {
          alert("Successful...");
          return result;
        }
      })
      .catch((err) => {
        console.log("error ", err);
      });
  };

  return (
    <div className="mainContainer">
      <div className="inputContainer">
        <div className="header-attraction">Update Attraction Status</div>
        <div className="body-status">
          <div>
            <b>Select Location</b>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <p>
              Latitude: {coordinates.lat} Longitude: {coordinates.lng}
            </p>
            <p>Address: {address}</p>
          </div>
          <div>
            <b>Select Crowdedness</b>
            <div>
              <Slider
                min={0}
                step={5}
                // max={labels.length - 1}
                max={10}
                value={value}
                className="custom-slider"
                handleStyle={{
                  borderRadius: 5,
                  color: "white",
                  fontSize: 12,
                  width: 50,
                  height: 20,
                }}
                graduated
                tooltip={false}
                handleTitle={clabels[value]}
                onChange={setValue}
              />
              <br></br>
            </div>
          </div>
          <div>
            <b>Select Weather</b>
            <div>
              <Slider
                min={0}
                step={5}
                // max={labels.length - 1}
                max={10}
                value={weather}
                className="custom-slider"
                handleStyle={{
                  borderRadius: 5,
                  color: "white",
                  fontSize: 12,
                  width: 50,
                  height: 20,
                }}
                graduated
                tooltip={false}
                handleTitle={wlabels[weather]}
                onChange={setWather}
              />
              <br></br>
            </div>
          </div>
          <div>
            <b>Open Now?</b>
            <div className="open-radio">
              <input
                type={"radio"}
                name={"open"}
                value={1}
                onChange={(e) => setOpen(e.target.value)}
              />
              <lable>Open</lable>
              <input
                type={"radio"}
                name={"open"}
                value={0}
                onChange={(e) => setOpen(e.target.value)}
              />
              <lable>Close</lable>
              <input
                type={"radio"}
                name={"open"}
                value={2}
                onChange={(e) => setOpen(e.target.value)}
              />
              <lable>Don't Know</lable>
            </div>
          </div>
          <div>
            <b>Visiting Now?</b>
            <div className="open-radio">
              <input
                type={"radio"}
                name={"visit"}
                value={1}
                onChange={(e) => setVisit(e.target.value)}
              />
              Yes
              <input
                type={"radio"}
                name={"visit"}
                value={0}
                onChange={(e) => setVisit(e.target.value)}
              />
              No
            </div>
          </div>
          <div>
            <b>Place Type?</b>
            <div className="open-radio">
              <input
                type={"radio"}
                name={"type"}
                value={1}
                onChange={(e) => setType(e.target.value)}
              />
              Indoor
              <input
                type={"radio"}
                name={"type"}
                value={0}
                onChange={(e) => setType(e.target.value)}
              />
              Outdoor
            </div>
          </div>
          <div className="save-buuton-attraction">
            <Button
              variant="outline-danger"
              size="sm"
              style={{ width: "100%" }}
              onClick={() => handleSubmit()}
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
