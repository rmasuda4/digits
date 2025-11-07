import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCardAdmin from '@/components/ContactCardAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Get ALL contacts (no filtering by owner)
  const contacts = await prisma.contact.findMany();

  // Get ALL notes (no filtering by owner)
  const notes = await prisma.note.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-3">
        <Row>
          <Col>
            <h2>List Contacts (Admin)</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCardAdmin
                    contact={contact}
                    notes={notes.filter((note) => note.contactId === contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
