import React from "react";
import { Form, Col } from "react-bootstrap";

const SearchFroms = ({ params, onParamsChange }) => {
  return (
    <Form className="mb-4">
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Location</Form.Label>
        <Form.Control
          onChange={onParamsChange}
          value={params.location}
          name="location"
          type="text"
        />
      </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchFroms;
