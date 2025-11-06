'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';

/* Renders a single contact card. See list/page.tsx. */
const ContactCard = ({ id, firstName, lastName, address, image, description }: Contact & { id: number }) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
