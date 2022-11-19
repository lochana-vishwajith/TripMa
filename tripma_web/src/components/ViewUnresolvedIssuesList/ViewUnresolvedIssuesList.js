import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function ViewUnresolvedIssuesList() {
  const [unresolvedIssues, setunresolvedIssues] = useState([]);
  const [addingsuggestions, setaddingsuggestions] = useState(false);
  const [selectedissueobj, setselectedissueobj] = useState("");
  const [suggestion, setsuggestion] = useState("");
  const [precaution, setprecaution] = useState(" ");

  console.log("start");
  useEffect(() => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/liveIssue")
      .then((response) => {
        console.log(response.data);

        const unresolve = response.data;
        const unreIssues = unresolve.filter((issue) => {
          return issue.isUserAccept == false;
        });
        setunresolvedIssues(unreIssues);
      })
      .catch((err) => console.log(err));
  }, []);

  function sendData() {
    console.log("suggestion", suggestion);
    console.log("precaution", precaution);
    console.log("issueobj", selectedissueobj);

    const id = selectedissueobj._id;

    let data = {
      id: id,
      obj: {
        IssueType: {
          location: selectedissueobj.location,
          date: selectedissueobj.date,
          time: selectedissueobj.time,
          criticality: selectedissueobj.IssueRating,
          type: selectedissueobj.IssueType,
          description: selectedissueobj.description,
          issue: selectedissueobj.Issue,
        },
        suggestions: suggestion,
        precautions: precaution,
      },
    };

    //after axios
    if (data.obj.suggestions && data.obj.precautions) {
      axios
        .post("https://travel-buddy-research.herokuapp.com/safetysug", data)
        .then((response) => {
          window.location.reload();
          
        })
        .catch((err) => console.log(err));
    } else {
      alert("please fill suggestion and the precaution both");
    }
  }
  return (
    <div
      style={{ paddingLeft: "5vh", paddingBottom: "1vh", paddingTop: "1vh" }}
    >
      <div style={{ paddingBottom: "3vh" }}>
        <Row>
          <Col>
            <center>
              <h1> ~View Un Resolved Issues~ </h1>
            </center>
          </Col>
          <Col>
            <Card
              bg="danger"
              style={{ width: "15rem", color: "white" }}
              className="mb-2"
            >
              <center>
                <h6>No of Un Resolved issues </h6>
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
                  <h5>Issue : {obj.Issue}</h5>
                </Card.Header>
                <Card.Body>
                  <h6>description : {obj.description}</h6>
                  <div>address : {obj.address}</div>
                  <Row>
                    <Col> Rating : {obj.IssueRating} </Col>
                    <Col> Type : {obj.IssueType}</Col>
                    <Col> Date : {obj.date} </Col>
                    <Col> Time : {obj.time} </Col>
                  </Row>

                  <br />

                  <Button
                    variant="outline-danger"
                    size="sm"
                    style={{ width: "100%" }}
                    onClick={() => {
                      setselectedissueobj(obj);
                      setaddingsuggestions(true);
                    }}
                  >
                    Add Suggestion
                  </Button>
                  {addingsuggestions && (
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Suggestion</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(e) => setsuggestion(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Precaution</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(e) => setprecaution(e.target.value)}
                        />
                      </Form.Group>
                      <center>
                        <Button
                          variant="danger"
                          onClick={() => {
                            sendData();
                          }}
                        >
                          Submit
                        </Button>
                      </center>
                    </Form>
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
