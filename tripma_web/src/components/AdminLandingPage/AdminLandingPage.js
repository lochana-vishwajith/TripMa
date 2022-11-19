import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

export default function AdminLandingPage() {
  return (
    <div
      style={{ paddingLeft: "5vh", paddingBottom: "8vh", paddingTop: "7vh" }}
    >
      <Row>
        <Col>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={{
              pathname: "/reviews",
            }}
          >
            <Card
              style={{ width: "30rem", height: "20rem", background: "brown" }}
            >
              <div
                style={{
                  paddingLeft: "20%",
                  paddingTop: "20%",
                }}
              >
                <h1 style={{ color: "white" }}>Admin Review Dashboard</h1>
              </div>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={{
              pathname: "/adminSafety-suggestions",
            }}
          >
            <Card
              style={{ width: "30rem", height: "20rem", background: "brown" }}
            >
              <div
                style={{
                  paddingLeft: "20%",
                  paddingTop: "20%",
                }}
              >
                <h1 style={{ color: "white" }}>Admin Safety Dashboard</h1>
              </div>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={{
              pathname: "/attraction-status",
            }}
          >
            <Card
              style={{ width: "30rem", height: "20rem", background: "brown" }}
            >
              <div
                style={{
                  paddingLeft: "20%",
                  paddingTop: "20%",
                }}
              >
                <h1 style={{ color: "white" }}>Attraction Status Update</h1>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
