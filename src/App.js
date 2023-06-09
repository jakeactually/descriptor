import logo from './logo.svg';
import './App.css';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';

function App() {
  const editorRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    editorRef.current.setContent(`
      Descubre nuestra nueva camisa de algodón con cuello en V para hombres.
      Fabricada con algodón fresco y transpirable, esta prenda te mantendrá cómodo durante todo el día.
      Su diseño moderno y suave tejido hacen que sea perfecta para lucir elegante en cualquier ocasión.
      ¡Experimenta la comodidad y estilo con nuestra camisa de algodón con cuello en V!
    `);
    handleClose();
  };

  return (
    <Container style={{ backgroundColor: 'white', height: '100vh', padding: 0 }}>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1" style={{ backgroundColor: '#0D47A1', padding: 20, color: 'white' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Titulo</Form.Label>
          <Form.Control type="text" placeholder="Mi nueva publicacion" />
        </Form.Group>
      </Form>

      <div style={{ padding: 20 }}>
        <Editor
          apiKey='ohqbz8kbm2f4ojhvbuvq154gp7afx8fnpbmk8nxf6tegruo5'
          onInit={(_, editor) => editorRef.current = editor}
          init={{
            menubar: false,
            toolbar: 'descriptor | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat',
            setup: (editor) => {
              editor.ui.registry.addButton("descriptor", {
                text: "Generar descripcion",
                onAction: handleShow
              });
            }
          }}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#0D47A1', color: 'white' }}>
          <Modal.Title>Generar descripcion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id='descriptorForm'>
            <Form.Group>
              <Form.Label>Palabras clave</Form.Label>
              <Form.Control as="textarea" onChange={ev => setKeywords(ev.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" type="submit" form='descriptorForm'>Generar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
