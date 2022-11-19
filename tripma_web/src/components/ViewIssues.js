import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

export default function ViewIssues() {
  const [unresolvedIssues, setunresolvedIssues] = useState([]);

  useEffect(() => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/liveIssue")
      .then((response) => {
        console.log(response.data);
        const unresolve = response.data;
        setunresolvedIssues(unresolve);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{ paddingLeft: "5vh", paddingBottom: "1vh", paddingTop: "1vh" }}
    >
      <div style={{ paddingBottom: "3vh" }}>
        <Row>
          <Col>
            <center>
              <h1> ~View Issues~ </h1>
            </center>
          </Col>
          <Col>
            <Card
              bg="danger"
              style={{ width: "15rem", color: "white" }}
              className="mb-2"
            >
              <center>
                <h6>No of issues </h6>
                <h4>{unresolvedIssues.length}</h4>
              </center>
            </Card>
          </Col>
        </Row>
      </div>
      {unresolvedIssues.length > 0 &&
        unresolvedIssues.map((obj) => {
          return (
            <div key={obj._id} style={{ paddingLeft: "30vh" }}>
              <Card border="danger" style={{ width: "80%" }}>
                <Card.Header>
                  <h5>Issue : Issue Title</h5>
                </Card.Header>
                <Card.Body>
                  <h6>description : {obj.description}</h6>
                  <Row>
                    <Col> Rating : {obj.rating} </Col>
                    <Col> Type : {obj.IssueType}</Col>
                    <Col> Date : {obj.date}</Col>
                    <Col> Time : {obj.time} </Col>
                  </Row>
                  <h6> address: {obj.address}</h6>
                  <br />
                  {obj.isUserAccept ? (
                    <h5>Resolved</h5>
                  ) : (
                    <h5> Not Resolved</h5>
                  )}
                </Card.Body>
              </Card>

              <br />
            </div>
          );
        })}

      {unresolvedIssues.length <= 0 && <div>No Un Resolved Issues </div>}
    </div>
  );
}
