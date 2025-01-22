import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAboutUsById, updateAboutUsAction } from '../../actions/aboutusactions'; // Import Redux actions
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import './aboutUs.scss'

const UpdateAboutUs = () => {
  const [aboutUs, setAboutUs] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Access state from Redux
  const { selectedEntry, loading, error } = useSelector((state) => state.aboutUsReducer);

  useEffect(() => {
    // Dispatch action to fetch the About Us entry by ID
    if (!selectedEntry || selectedEntry._id !== id) {
      dispatch(fetchAboutUsById(id));
    } else {
      setAboutUs(selectedEntry);
    }
  }, [dispatch, id, selectedEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aboutUs) {
      const updatedData = {
        title: aboutUs.title,
        content: aboutUs.content,
        image: aboutUs.image,
      };
      dispatch(updateAboutUsAction(id, updatedData))
        .then(() => {
          setSuccess(true);
          // Optionally reset the form or navigate away
        })
        .catch(() => setSuccess(false));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id='update-aboutus' className="outer">
      <Container className='mt-4 cont'>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-4">
              <h2>Update About Us Entry</h2>
            </div>
            {success && <Alert variant="success">Entry updated successfully!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {aboutUs && (
              <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    value={aboutUs.title}
                    onChange={(e) => setAboutUs({ ...aboutUs, title: e.target.value })}
                    placeholder="Enter title"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formContent" className="mb-3">
                  <Form.Label>Content:</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={aboutUs.content}
                    onChange={(e) => setAboutUs({ ...aboutUs, content: e.target.value })}
                    placeholder="Enter content"
                    rows={4}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImageUrl" className="mb-3">
                  <Form.Label>Image URL:</Form.Label>
                  <Form.Control
                    type="text"
                    value={aboutUs.image}
                    onChange={(e) => setAboutUs({ ...aboutUs, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary" className="w-100">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default UpdateAboutUs;
