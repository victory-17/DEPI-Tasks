import Swal from 'sweetalert2';

export default function ProductsTable({
  products,
  handleUpdatedProduct,
  deleteProductByIndex,
}) {
  const handleDeleteProduct = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'The item has been successfully deleted.',
          icon: 'success',
        });
        deleteProductByIndex(index);
      }
    });
  };

  return (
    <>
      <div id="product-tabel-container" className="container my-5">
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="tabel-body">
              {products.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.cat}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleUpdatedProduct(item, index)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteProduct(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
