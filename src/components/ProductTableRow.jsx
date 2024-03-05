// ProductTableRow.jsx
import React from 'react';

const ProductTableRow = ({ productsData, onDelete, onEdit }) => {
  return (
    productsData.map((data, index) => {
      return (
        // Returning JSX
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>
            <button onClick={() => onDelete(data.id)}>Delete</button>
            <button onClick={() => onEdit(data)}>Edit</button>
          </td>
        </tr>
      );
    })
  );
};

export default ProductTableRow;
