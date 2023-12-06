import React from "react";
import { Container, Row, Col, Stack, Card } from "react-bootstrap";
import Map from "./Components/Map";
import Header from "./Components/Header";
import Search from "./Components/Search";
import { useState, createContext } from "react"


export default function App() {
  const [data, setData] = useState('');

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };


  return (
    <>
      <Header/>
      <main className="py-3">
        <Container fluid>
          <Row>
            <Col md={9}>
              <Map data={data}/>
            </Col>
            <Col md={3}>
              <Search onDataFetched={handleDataFetched}/>
              <div className="p-3 my-5">
                <Card className="text-center">
                  <Card.Header>
                    Properties
                  </Card.Header>
                  <Card.Body>
                    <Stack gap={2}>
                      <div className="p-3 border border-3 rounded-3">State Name: {data.name}</div>
                      <div className="p-3 border border-3 rounded-3">Obesity Rate: {data.obesity}</div>
                      <div className="p-3 border border-3 rounded-3">Feature ID: {data.fid}</div>
                      <div className="p-3 border border-3 rounded-3">Shape Length: {data.shape_Length}</div>
                      <div className="p-3 border border-3 rounded-3">Shape Area: {data.shape_Area}</div>
                    </Stack>
                  </Card.Body>
                </Card>
              </div>
              <div className="p-3">
              <Card className="text-center">
                  <Card.Header>
                    About
                  </Card.Header>
                  <Card.Body>
                    This heat map use national obesity data by state from this <a href='https://catalog.data.gov/dataset/national-obesity-by-state-d765a'>link</a>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>

  );
}
