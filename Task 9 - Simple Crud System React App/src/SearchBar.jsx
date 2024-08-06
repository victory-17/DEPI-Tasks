import Swal from 'sweetalert2';

export default function SearchBar({ filterProducts }) {
  const handleSearch = (e) => {
    filterProducts(e);
    if (e.target.value.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'No Results',
        text: 'No matching products found!',
      });
    }
  };

  return (
    <div className="my-5 w-75 mx-auto">
      <input
        type="text"
        className="form-control"
        id="search-input"
        onChange={handleSearch}
        placeholder="search by product name.."
      />
    </div>
  );
}
