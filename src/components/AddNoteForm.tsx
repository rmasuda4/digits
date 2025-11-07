'use client';

import { useSession } from 'next-auth/react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { note: string; contactId: number; owner: string }) => {
  await addNote(data);
  swal('Success', 'Your note has been added', 'success', {
    timer: 2000,
  });
};

// eslint-disable-next-line react/prop-types
const AddNoteForm: React.FC<{ contactId: number }> = ({ contactId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Add Note</Form.Label>
        <textarea
          {...register('note')}
          className={`form-control ${errors.note ? 'is-invalid' : ''}`}
          rows={2}
        />
        <div className="invalid-feedback">{errors.note?.message}</div>
      </Form.Group>
      <input type="hidden" {...register('contactId')} value={contactId} />
      <input type="hidden" {...register('owner')} value={currentUser} />
      <Form.Group className="form-group">
        <Row className="pt-2">
          <Col>
            <Button type="submit" variant="primary" size="sm">
              Submit
            </Button>
          </Col>
          <Col>
            <Button type="button" onClick={() => reset()} variant="warning" size="sm" className="float-right">
              Reset
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default AddNoteForm;
