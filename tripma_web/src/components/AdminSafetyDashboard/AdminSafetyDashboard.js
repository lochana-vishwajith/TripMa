import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

export default function AdminSafetyDashboard() {
  const [issuesList, setIssuesList] = useState([]);
  const [resolvedIssues, setresolvedIssues] = useState([]);
  const [unresolvedIssues, setunresolvedIssues] = useState([]);
  const [precautions, setprecautions] = useState([]);

  useEffect(() => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/liveIssue")
      .then((response) => {
        console.log(response.data);
        setIssuesList(response.data);
        getIssueTypes(response.data);
      });

    axios
      .get("https://travel-buddy-research.herokuapp.com/safetysug")
      .then((res) => {
        console.log(res.data);
        setprecautions(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const getIssueTypes = (data) => {
    const resolve = data;
    const unresolve = data;
    //Attraction positive count
    const reIssues = resolve.filter((issue) => {
      return issue.isUserAccept == true;
    });
    setresolvedIssues(reIssues);

    const unreIssues = unresolve.filter((issue) => {
      return issue.isUserAccept == false;
    });
    setunresolvedIssues(unreIssues);
  };

  return (
    <div
      style={{ paddingLeft: "5vh", paddingBottom: "8vh", paddingTop: "7vh" }}
    >
      <Row>
        <Col>
          <div style={{ paddingBottom: "2vh" }}></div>

          <div style={{ paddingBottom: "2vh", paddingTop: "3vh" }}>
            <Link to="/unresolvedissueList">
              <Button
                variant="outline-danger"
                size="lg"
                style={{ width: "100%" }}
              >
                VIEW UNRESOLVED ISSUES
              </Button>
            </Link>
          </div>

          <div style={{ paddingBottom: "2vh" }}>
            <Link to="/issuesList">
              <Button
                variant="outline-danger"
                size="lg"
                style={{ width: "100%" }}
              >
                VIEW ISSUES
              </Button>
            </Link>
          </div>
        </Col>
        <Col>
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Row></Row>
              <Row>
                <Col>
                  <div style={{ paddingLeft: "2vh" }}>
                    <center>
                      <h4>{resolvedIssues.length}</h4>
                    </center>
                    <h6>No Of Issues Resolved</h6>
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingLeft: "2vh" }}>
                    <center>
                      <h4>{unresolvedIssues.length}</h4>
                    </center>
                    <h6>No Of Issues UnResolved</h6>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <center>
                    <h4>{precautions.length}</h4>
                    <h6>No of Safety Precautions Added</h6>
                  </center>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
