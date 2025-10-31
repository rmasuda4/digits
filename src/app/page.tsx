'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { PeopleFill, FileEarmarkTextFill, Calendar2CheckFill } from 'react-bootstrap-icons';

export default function HomePage() {
  return (
    <main>
      <Container className="text-center mt-5">
        <Row className="justify-content-center align-items-start">
          <Col md={3}>
            <PeopleFill size={60} />
            <h3 className="mt-3">Users and Contacts</h3>
            <p>
              This address book enables any number of users to register and save their business contacts.
              You can only see the contacts you have created.
            </p>
          </Col>

          <Col md={3}>
            <FileEarmarkTextFill size={60} />
            <h3 className="mt-3">Contact Information</h3>
            <p>
              For each contact, you can save their name, address, and phone number.
            </p>
          </Col>

          <Col md={3}>
            <Calendar2CheckFill size={60} />
            <h3 className="mt-3">Notes and History</h3>
            <p>
              Each time you make contact with a contact, you can write a note that summarizes
              the conversation. This note is saved along with a timestamp with the contact.
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
