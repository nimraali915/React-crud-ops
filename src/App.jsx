import { useEffect, useState } from "react";
import ProductTableRow from "./components/ProductTableRow";
import React from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({
    id: "",
    name: "",
    description: ""
  });

  const SubmitForm = (e) => {
    e.preventDefault();
    // if (input.id) {
    const foundProducts = products.filter(data=>data.id==input.id);
    if (foundProducts.length>0) {
      onUpdate();
    } else if (input.name !== "" && input.description !== "") {
      onAdd();
    } else {
      alert("Please fill in all the fields");
    }
    setInput({
      id:"",
      name:"",
      description:""
    })
  };

  const onAdd = () => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(response => response.json())
      .then(data => {
        setProducts(prevProducts => [...prevProducts, data]);
        setInput({ id: "", 
        name: "",
        description: "" });
      })
      .catch(error => console.log(error));
  };
  
const onUpdate = () => {
  fetch(`http://localhost:3000/products/${input.id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  }).then(response=>response.json())
    
    .then(updatedProduct => {
      console.log(updatedProduct);
      // const updatedProducts = products.map(product =>
      //   product.id === updatedProduct.id ? updatedProduct : product
      // );
      // setProducts(updatedProducts);
      // setInput({ id: "", name: "", description: "" });
      // console.log("Product updated successfully:", updatedProduct);
      const updateProducts = products.filter(pro=>{
        return pro.id !== updatedProduct.id;
      })
      console.log(updateProducts)
      setProducts([updatedProduct, ...updateProducts]);
    })
    .catch(error => {
      console.error("Error updating product:", error);
    });
};



  const onDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setInput({ id: "", name: "", description: "" }); // Reset the form inputs
      })
      .catch(error => console.log(error));
  };

  const handleEdit = (product) => {
    // Set the form inputs with the data of the selected product for editing
    setInput({
      id: product.id,
      name: product.name,
      description: product.description,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1>Products</h1>
      <form>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            value={input.id}
            
          />
        </div>
        <br />

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            value={input.name}
          />
        </div>
        <br />

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            value={input.description}
          />
        </div>
        <br />

        <div>
          <input type="button" value="Save" onClick={SubmitForm} />
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            <ProductTableRow
              productsData={products}
              onDelete={onDelete}
              onEdit={handleEdit} // Pass the handleEdit function to the ProductTableRow
            />
          ) : (
            <tr>
              <th colSpan={4}>No Data is Available</th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default App;
