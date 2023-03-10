import React, { useState } from "react";
import { postImage } from "../../../services/postImage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormGroup from "react-bootstrap/esm/FormGroup";

export default function RackPLimpieza({ visit, catId }) {
  const [input, setInput] = useState({
    visitId: visit.id,
    categoryId: catId.catId,
    subcategoryId: 1,
    image: "",
    response: null,
    observation: null,
  });
 
  async function handleImageChange(e) {
    handlePostImage(e.target.files[0]);
  }
  async function handlePostImage(images) {
    const url = await postImage(images);
    console.log(url);
    setInput({
      ...input,
      image: url,
    });
  }
  //res.cloudinary.com/dxsvkn4eo/image/upload//e9e3392f0c5f7a954519d7064746aa5e
//res.cloudinary.com/CLOUD_NAME/image/upload//sezbnxko40mu1tyxa1ez.png
  async function createInspection(input) {
    await axios
      .post(REACT_APP_API_URL + "/inspection/create", input)
      .then((response) => {
        const respuesta = response.data.body;
        console.log(respuesta);
        return respuesta;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelect(e) {
    e.preventDefault()
    const newInput = {
      ...input,
      response: e.target.value,
    };
    setInput(newInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);

    createInspection(input);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Group className="mb-3">
            <FormGroup className="mb-3">
              {/* <Form.Label>Rack Principal - Limpieza</Form.Label> */}
              <Form.Select onChange={(e) =>{handleSelect(e)}} aria-label="Revisado Si/No">
                <option>Revisado Si/No</option>
                <option value={true}>
                  SI
                </option>
                <option value={false}>
                  NO
                </option>
              </Form.Select>

              <InputGroup>
                <InputGroup.Text>Observaciones</InputGroup.Text>
                <Form.Control onChange={handleSelect} name="observation" as="textarea" aria-label="Observaciones" />
                <InputGroup>
                  <Form.Label>FOTO</Form.Label>
                  <Form.Control onChange={handleImageChange} name="image" type="file" accept="image/*"></Form.Control>
                </InputGroup>
              </InputGroup>
            </FormGroup>
          </Form.Group>
        </Form.Group>
        <Button type="submit"  >Guardar</Button>

      </Form>
    </Container>
  );
}
