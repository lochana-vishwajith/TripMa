import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function CustomerDetails() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    var USERID = sessionStorage.getItem("USERID");
    console.log("USERID - ", USERID);

    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/user/getUserDetails/${USERID}`
      )
      .then((res) => {
        console.log("userdata - ", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container PageHeader">
      <h1>User Details</h1>
      {userData ? (
        <center>
          <Card style={{ width: "30rem", marginTop: "5%" }}>
            <Card.Img variant="top" src={userData.image} />
            <Card.Body>
              <Card.Text>UserName - {userData.fullName}</Card.Text>
              <Card.Text>Phone Number - {userData.phoneNumber}</Card.Text>
              <Card.Text>Email - {userData.email}</Card.Text>
              <Card.Text>Occupation - {userData.occupation}</Card.Text>
              <Card.Text>Languages - {userData.skills}</Card.Text>
            </Card.Body>
          </Card>
        </center>
      ) : null}
    </div>
  );
}

export default CustomerDetails;
