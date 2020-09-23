import React, {useState} from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkDown from "react-markdown";

export default function Job({ job }) {
    const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="">
              <Card.Title>
                {job.title} -{" "}
                <span className="text-muted font-weight-light">
                  {job.company}
                </span>
              </Card.Title>
              <Card.Subtitle className="text-muted">
                {new Date(job.created_at).toLocaleDateString()}
              </Card.Subtitle>
              <Badge variant="secondary" className="mr-2">
                {job.type}
              </Badge>
              <Badge variant="secondary">{job.location}</Badge>
              <div className="" style={{ wordBreak: "break-all" }}>
                <ReactMarkDown source={job.how_to_apply}></ReactMarkDown>
              </div>
            </div>
            <img
              src={job.company_logo}
              alt={job.company}
              className="d-none d-md-block"
              height="50"
            />
          </div>
          <Card.Text>
            <Button variant="primary"
            onClick={() => setOpen(!open)}
            >{!open ? 'View Details' : 'Hide Details'}</Button>
          </Card.Text>
          <Collapse in={open}>
            <div className="mt-4">
              <ReactMarkDown source={job.description} />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
