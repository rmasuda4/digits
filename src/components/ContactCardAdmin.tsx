'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Note } from '@prisma/client';
import { Contact } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';

/* Renders a single contact card for admin with owner info. */
const ContactCardAdmin = ({ contact, notes }: { contact: Contact & { id: number }; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Img src={contact.image} width={75} />
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
      <ListGroup variant="flush">
        {notes.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
