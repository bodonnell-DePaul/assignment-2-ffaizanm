// Updated App.js to include refined color variant logic and properly display each ToDo item

import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import todoItems from './todoItems'; // Importing the ToDo items list
import './App.css'; // Importing CSS for styles

function App() {
  const [todos] = useState(todoItems); // Initial state with static ToDo items

  // Function to determine the Bootstrap color variant based on due date
  const getVariant = (dueDate) => {
    const today = new Date();
    const targetDate = new Date(dueDate);
    const dateDiff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)); // Difference in days, rounded up

    if (dateDiff > 7) return 'primary'; // More than 7 days
    if (dateDiff <= 7 && dateDiff > 4) return 'success'; // Between 4 and 7 days
    if (dateDiff <= 4 && dateDiff > 2) return 'warning'; // Between 2 and 4 days
    return 'danger'; // Less than or equal to 2 days
  };

  return (
    <div className="container">
      <h1>Assignment 2: ToDo List</h1>
      <Row>
        <Col sm={4}>
          <Form>
            <Form.Group controlId="formTodoItem">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control type="text" placeholder="Add todo item" />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add ToDo
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Tab.Container id="todo-list">
            <Row>
              <Col sm={4}>
                <ListGroup role="tablist">
                  {todos.map((todo, idx) => (
                    <ListGroup.Item
                      key={idx}
                      action
                      href={`#todo-${idx}`}
                      role="tab"
                      aria-controls={`#todo-${idx}`}
                      data-testid={`todo-item-${idx}`}
                      className={`list-group-item list-group-item-${getVariant(todo.dueDate)} list-group-item-action`}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todos.map((todo, idx) => (
                    <Tab.Pane key={idx} eventKey={`#todo-${idx}`}>
                      <h4 data-testid={`todo-title-${idx}`}>{todo.title}</h4>
                      <p contentEditable="true" data-testid={`todo-desc-${idx}`}>{todo.description}</p>
                      <Form.Label>Due Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={todo.dueDate}
                        readOnly
                        className="form-control"
                        data-testid={`todo-date-${idx}`}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;