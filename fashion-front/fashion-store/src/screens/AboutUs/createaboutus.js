import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAboutUsAction } from '../../actions/aboutusactions'; // Import Redux action
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import './aboutUs.scss'

const CreateAboutUs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  // Access Redux state
  const { loading, success, error } = useSelector((state) => state.aboutUsReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAboutUs = { title, content, image };

    // Dispatch the create action
    dispatch(createAboutUsAction(newAboutUs));

    if (success === undefined) {
      alert('About Us section updated successfully!');
      setTitle('');
      setContent('');
      setImage('');
    }else {
      alert('About Us section update unsuccessfull!');
    }
  };

  return (
    <div id='create-aboutus' className="outer">
    <Container className="mt-4 cont">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mb-4">
            <h2>Create About Us Entry</h2>
          </div>
          {success && <Alert variant="success">Entry created successfully!</Alert>}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                rows={4}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl" className="mb-3">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary" disabled={loading} className="w-100">
                {loading ? <Spinner animation="border" size="sm" /> : "Create"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CreateAboutUs;
