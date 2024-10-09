import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import todos from './todoItems';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(todos);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '' });

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodoList([...todoList, newTodo]);
    setNewTodo({ title: '', description: '', dueDate: '' });
  };

  const handleTodoChange = (index, field, value) => {
    const updatedTodos = todoList.map((todo, i) => (
      i === index ? { ...todo, [field]: value } : todo
    ));
    setTodoList(updatedTodos);
  };

  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  return (
    <div className="container">
      <h1>Assignment 2: Faiz's ToDo List</h1>
      <Row>
        <Col sm={4}>
          <Form onSubmit={handleAddTodo} className="add-todo-form">
            <Form.Group controlId="formTodoItem">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add todo item"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="mm/dd/yyyy"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add ToDo
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Tab.Container id="todo-list-tabs" defaultActiveKey="#todo-0">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todoList.map((todo, index) => (
                    <ListGroup.Item
                      action
                      href={`#todo-${index}`}
                      key={index}
                      variant={getVariant(todo.dueDate)}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todoList.map((todo, index) => (
                    <Tab.Pane eventKey={`#todo-${index}`} key={index}>
                      <Form.Group controlId={`todo-description-${index}`}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={todo.description}
                          onChange={(e) => handleTodoChange(index, 'description', e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId={`todo-dueDate-${index}`}>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={todo.dueDate}
                          onChange={(e) => handleTodoChange(index, 'dueDate', e.target.value)}
                        />
                      </Form.Group>
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