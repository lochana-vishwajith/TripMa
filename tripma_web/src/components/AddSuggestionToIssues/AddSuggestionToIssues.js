import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function AddSuggestionToIssues(props) {
  console.log(props.params);
  const [suggestion, setsuggestion] = useState("");
  const [precaution, setprecaution] = useState(" ");

  //const id =
  function sendData(e) {
    e.preventDefault();
    console.log("suggestion", suggestion);
    console.log("precaution", precaution);
    //after axios
    window.location = "/unresolvedissueList";
  }

  return (
    <div
      style={{ paddingLeft: "5vh", paddingBottom: "8vh", paddingTop: "7vh" }}
    >
      <center>
        <h3>Issue</h3>
        <br />
        <Card border="danger" style={{ width: "68rem" }}>
          <div
            style={{
              paddingLeft: "2vh",
              paddingBottom: "2vh",
              paddingTop: "2vh",
              paddingRight: "2vh",
            }}
          >
            <Form onSubmit={sendData}>
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
                <Button variant="danger" type="submit">
                  Add Suggestion
                </Button>
              </center>
            </Form>
          </div>
        </Card>
      </center>
    </div>
  );
}
