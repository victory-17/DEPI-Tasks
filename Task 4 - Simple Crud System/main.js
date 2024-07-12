document.addEventListener("DOMContentLoaded", () => {
    const productNameInput = document.getElementById('productName');
    const productCategoryInput = document.getElementById('productCategory');
    const productPriceInput = document.getElementById('productPrice');
    const productDescriptionInput = document.getElementById('productDescription');
    const addProductBtn = document.getElementById('addProductBtn');
    const clearBtn = document.getElementById('clearBtn');
    const productTable = document.getElementById('productTable');
    const tbody = productTable.querySelector('tbody');
    const noDataMessage = document.getElementById('noDataMessage');
    const searchBar = document.getElementById('searchBar');
    const searchFilter = document.getElementById('searchFilter');
    

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let editIndex = null;

    const renderTable = () => {
        tbody.innerHTML = '';
        if (products.length === 0) {
            noDataMessage.style.display = 'block';
            productTable.style.display = 'none';
        } else {
            noDataMessage.style.display = 'none';
            productTable.style.display = 'table';
            products.forEach((product, index) => {
                const row = document.createElement('tr');
                
                const indexCell = document.createElement('td');
                indexCell.textContent = index + 1;
                row.appendChild(indexCell);
                
                const nameCell = document.createElement('td');
                nameCell.textContent = product.name;
                row.appendChild(nameCell);
                
                const categoryCell = document.createElement('td');
                categoryCell.textContent = product.category;
                row.appendChild(categoryCell);
                
                const priceCell = document.createElement('td');
                priceCell.textContent = product.price;
                row.appendChild(priceCell);
                
                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = product.description;
                row.appendChild(descriptionCell);
                
                const editCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-outline-success';
                editButton.innerHTML = '<i class="far fa-edit"></i>';
                editButton.addEventListener('click', () => editProduct(index));
                editCell.appendChild(editButton);
                row.appendChild(editCell);
                
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-outline-danger';
                deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
                deleteButton.addEventListener('click', () => deleteProduct(index));
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);
                
                tbody.appendChild(row);
            });
        }
    };

    const clearForm = () => {
        productNameInput.value = '';
        productCategoryInput.value = '';
        productPriceInput.value = '';
        productDescriptionInput.value = '';
        addProductBtn.textContent = 'Add Product';
        editIndex = null;
    };

    const validateInputs = () => {
        const name = productNameInput.value.trim();
        const category = productCategoryInput.value.trim();
        const price = productPriceInput.value.trim();
        const description = productDescriptionInput.value.trim();
        const pricePattern = /^[0-9]+$/;

        if (!name || !category || !price || !description) {
            alert('Please fill in all fields.');
            return false;
        }

        if (!pricePattern.test(price)) {
            alert('Please enter a valid price.');
            return false;
        }

        return { name, category, price, description };
    };

    addProductBtn.addEventListener('click', () => {
        const product = validateInputs();
        if (!product) return;

        if (editIndex !== null) {
            products[editIndex] = product;
            addProductBtn.textContent = 'Add Product';
        } else {
            products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));
        clearForm();
        renderTable();
    });

    clearBtn.addEventListener('click', clearForm);

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filter = searchFilter.value;
        const filteredProducts = products.filter((product, index) => {
            switch (filter) {
                case 'name':
                    return product.name.toLowerCase().includes(query);
                case 'category':
                    return product.category.toLowerCase().includes(query);
                default:
                    return false;
            }
        });

        tbody.innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
                
            const indexCell = document.createElement('td');
            indexCell.textContent = index + 1;
            row.appendChild(indexCell);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);
            
            const categoryCell = document.createElement('td');
            categoryCell.textContent = product.category;
            row.appendChild(categoryCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = product.price;
            row.appendChild(priceCell);
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = product.description;
            row.appendChild(descriptionCell);
            
            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-success';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', () => editProduct(index));
            editCell.appendChild(editButton);
            row.appendChild(editCell);
            
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', () => deleteProduct(index));
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
            
            tbody.appendChild(row);
        });
    });

    productPriceInput.addEventListener('input', () => {
        const pricePattern = /^[0-9]*$/;
        if (!pricePattern.test(productPriceInput.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter numbers only.',
            });
            productPriceInput.value = productPriceInput.value.replace(/[^0-9]/g, '');
        }
    });

    window.editProduct = (index) => {
        const product = products[index];
        productNameInput.value = product.name;
        productCategoryInput.value = product.category;
        productPriceInput.value = product.price;
        productDescriptionInput.value = product.description;
        addProductBtn.textContent = 'Update Product';
        addProductBtn.style.backgroundColor = 'green'; 
        editIndex = index;

        // Change button color to green if text is Update Product
        if (addProductBtn.textContent === 'Update Product') {
            setTimeout(() => {
                addProductBtn.style.backgroundColor = '';
            }, 2000);
        }
    };

    window.deleteProduct = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(products));
                renderTable();
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
            }
        })
    };


    renderTable();
});

// function isNumber(evt) {
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//         return false;
//     }
//     return true;
// }
