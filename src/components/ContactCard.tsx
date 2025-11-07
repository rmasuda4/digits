'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Note } from '@prisma/client';
import { Contact } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

/* Renders a single contact card. See list/page.tsx. */
const ContactCard = ({ contact, notes }: { contact: Contact & { id: number }; notes: Note[] }) => (
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
      <ListGroup variant="flush">
        {notes.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <AddNoteForm contactId={contact.id} />
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
