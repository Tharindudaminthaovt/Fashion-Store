import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllAboutUs,
  deleteAboutUsAction,
} from '../../actions/aboutusactions'; // Import Redux actions
import { setCurrentAboutUsAction } from '../../actions/currentabusactions';
import { Container, Row, Col, Button, ListGroup, Alert, Card } from "react-bootstrap";
import './aboutUs.scss'

const AboutUsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/createaboutus');
  };
  // Access aboutUs state and loading/error flags from Redux
  const { entries = [], loading, error } = useSelector((state) => state.aboutUsReducer.aboutUs)

  useEffect(() => {
    dispatch(fetchAllAboutUs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      dispatch(deleteAboutUsAction(id))
        .then(() => alert('Entry deleted successfully.'))
        .catch(() => alert('Error deleting entry.'));
    }
  };

  const handleSetCurrent = (id) => {
    dispatch(setCurrentAboutUsAction(id))
      .then(() => alert('Current About Us has been updated successfully.'))
      .catch(() => alert('Error setting current About Us.'));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to the UpdateAboutUs route
  };

  if (loading) return <Alert variant="info">Loading...</Alert>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  if (entries.length === 0) return <Alert variant="warning">No About Us entries found.</Alert>;

  return (
    <div className='outer'>
      <Container style={{ marginTop: "80px" }} className='cont'>
        <Row className="justify-content-center">
        <button
          onClick={handleCreateNew}
          className="  px-4 py-2 rounded hover:bg-blue-700"
          style={{marginBottom:'30px',marginTop:'30px',backgroundColor:'#0276e3'}}
        >
          Create New AboutUs
        </button>
          <Col md={10}>
            <div className="text-center mb-4">
              <h2>About Us Entries</h2>
            </div>
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                paddingRight: "1rem",
              }}
            >
              {entries.map((entry) => (
                <Card className="mb-3 shadow-sm aboutus-entry" key={entry._id}>
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <div
                          style={{
                            width: "100%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={entry.image}
                            alt={entry.title}
                            style={{
                              width: "100%",
                              height: "6.5rem",
                              objectFit: "cover",
                            }}
                            className="rounded"
                          />
                        </div>
                      </Col>
                      <Col md={9}>
                        <h3>{entry.title}</h3>
                        <div className="mt-3">
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={() => handleDelete(entry._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleUpdate(entry._id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleSetCurrent(entry._id)}
                          >
                            Set as Current
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUsList;
