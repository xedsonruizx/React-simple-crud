import React, { useRef, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaBeer } from "react-icons/fa";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";
import axios from "axios";
import Swal from "sweetalert2"; // ES6 Modules or TypeScript

const SearchComponent = () => {
  // setear los hooks de useStates
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const addDescription = useRef(null);
  const addName = useRef(null);
  const Swal = require("sweetalert2");

  //   --------------------------------------------------------------------------------------------------
  //   ----------------------------------------- FUNCIONES ----------------------------------------------
  //   --------------------------------------------------------------------------------------------------

  // traer los datos de la api
  const URL = "http://localhost:3001/api";
  // const showData = async () => {
  //   console.log("get");
  //   this.axios.get(URL + "/posts").then((response) => {
  //     console.log("RESPONSE");
  //     console.log(response);
  //     setPosts(response.data.resultados);
  //   });
  //   const response = await fetch(URL + "/posts", { method: "get" });
  //   const data = await response.json();
  //   console.log(data.resultados);
  //   setPosts(data.resultados);
  // };

  const showData = async () => {
    axios
      .get(URL + "/posts")
      .then((resp) => {
        setPosts(resp.data.resultados);
      })
      .catch((error) => console.log(error));
  };

  //funcion de busqueda

  const handleClick = () => {
    setSearch(inputRef.current.value);
  };

  // metodo de filtrado (2 formas)

  let filtered_list = [];
  if (!search) {
    filtered_list = posts;
  } else {
    filtered_list = posts.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  //funcion de crear
  // const handleChange = (e) => {
  //   // console.log(e.target.value);
  // };

  const handleCreate = async () => {
    // console.log(newPost);

    axios
      .post(URL + "/post/", {
        nombre: addName.current.value,
        descripcion: addDescription.current.value,
      })
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Tu registro ha sido guardado",
          showConfirmButton: false,
          timer: 1500,
        });
        showData();
        addName.current.value = "";
        addDescription.current.value = "";
      })
      .catch((error) => console.log(error));

    // let result = await fetch(URL + `/post/`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify(newPost), // body data type must match "Content-Type" header
    // });

    // result = await result.json();
    // if (result) {
    //   if (alert("Post Creado")) {
    //     window.location.reload(true);
    //   }
    // }
  };

  // metodo de eliminar
  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No sera posible revertir la acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(URL + `/post/${id}`)
          .then((resp) => {
            Swal.fire("Borrado!", "Tu registro a sido borrado.", "Exito");
            showData();
          })
          .catch((error) => console.log(error));
      }
    });

    // if (window.confirm("Estas seguro?")) {
    //   // deleteNote(noteId);
    //   let result = await axios(URL + `/post/${id}`, { method: "delete" });
    //   result = await result.json();
    //   if (result) {
    //     if (alert("Post eliminado")) {
    //       window.location.reload(true);
    //     }
    //   }
    // }
  };

  //   muestra la data
  useEffect(() => {
    showData();
  }, []);
  //   --------------------------------------------------------------------------------------------------
  //   ---------------------------------------------- VISTA----------------------------------------------
  //   --------------------------------------------------------------------------------------------------
  return (
    <div className="container-sm">
      {/* Buscador */}
      <Row>
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar"
            ref={inputRef}
            id="filter"
            name="filter"
          />
        </Col>
        <Col className="text-end">
          <Button variant="outline-dark" onClick={handleClick}>
            Buscar
          </Button>
        </Col>
      </Row>
      {/* tabla */}
      <table className="table table-bordered table-hover mt-3 shadow-lg">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* <If condition={filtered_list.length > 0}> */}
          {/* <Then> */}
          {filtered_list?.map((post) => (
            <tr key={post.id}>
              <td>{post.nombre}</td>
              <td>{post.descripcion}</td>
              <td>
                <Button variant="danger" onClick={() => deleteHandler(post.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {/* </Then>
            <Else>
              <If condition={(filtered_list.length = 0)}>
                <tr>
                  <td colspan={3}>No se encontraron datos</td>
                </tr>
              </If>
            </Else>
          </If> */}
          {/* si no hay datos */}
        </tbody>
      </table>
      <Row>
        <Col md={5}>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            ref={addName}
            id="name"
            name="name"
          />
        </Col>
        <Col md={6}>
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            ref={addDescription}
            id="description"
            name="description"
          />
        </Col>
        <Col md={1} className="text-end">
          <Button variant="outline-dark" onClick={handleCreate}>
            Crear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchComponent;
