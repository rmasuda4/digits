'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

/* Renders a single contact card for admin with owner info. */
const ContactCardAdmin = ({ firstName, lastName, address, image, description, owner }: Contact) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Img src={image} width={75} />
      <Card.Title>
        {firstName}
        {' '}
        {lastName}
      </Card.Title>
      <Card.Subtitle>{address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
      <p className="blockquote-footer">{owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
