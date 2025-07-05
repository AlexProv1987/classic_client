import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export const Users: React.FC = () => {
  const [showPeopleColumn, setShowPeopleColumn] = useState(false);

  const handleToggle = () => {
    setShowPeopleColumn(!showPeopleColumn);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={6}>
          <Button variant="outline-primary" onClick={handleToggle}>
            I am for people
          </Button>
        </Col>

        <Col xs={6} className="position-relative">
          {showPeopleColumn && (
            <div className="fade-in-panel">
              <Card className="p-3 shadow">
                <h4>People Info Panel</h4>
                <p>This panel fades in from the right.</p>
                <ul>
                  <li>Exoneree 1</li>
                  <li>Exoneree 2</li>
                  <li>Exoneree 3</li>
                </ul>
              </Card>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
