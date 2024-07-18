document.addEventListener("DOMContentLoaded", () => {
    class ProductManager {
        constructor() {
            this.products = JSON.parse(localStorage.getItem('products')) || [];
            this.editIndex = null;
            this.darkTheme = false;

            this.productNameInput = document.getElementById('productName');
            this.productCategoryInput = document.getElementById('productCategory');
            this.productPriceInput = document.getElementById('productPrice');
            this.productDescriptionInput = document.getElementById('productDescription');
            this.addProductBtn = document.getElementById('addProductBtn');
            this.clearBtn = document.getElementById('clearBtn');
            this.productTable = document.getElementById('productTable');
            this.tbody = this.productTable.querySelector('tbody');
            this.noDataMessage = document.getElementById('noDataMessage');
            this.searchBar = document.getElementById('searchBar');
            this.searchFilter = document.getElementById('searchFilter');
            this.themeToggle = document.getElementById('themeToggle');
            this.themeIcon = document.getElementById('themeIcon');
            this.noResultsAlert = document.getElementById('noResultsAlert');

            this.addProductBtn.addEventListener('click', () => this.addOrUpdateProduct());
            this.clearBtn.addEventListener('click', () => this.clearForm());
            this.searchBar.addEventListener('input', () => this.searchProducts());
            this.productPriceInput.addEventListener('input', () => this.validatePriceInput());
            this.themeToggle.addEventListener('click', () => this.toggleTheme());

            this.renderTable();
        }

        toggleTheme() {
            this.darkTheme = !this.darkTheme;
            document.body.classList.toggle('dark-theme', this.darkTheme);
            this.themeIcon.classList.toggle('fa-moon', !this.darkTheme);
            this.themeIcon.classList.toggle('fa-sun', this.darkTheme);
        }

        renderTable() {
            this.tbody.innerHTML = '';
            if (this.products.length === 0) {
                this.noDataMessage.style.display = 'block';
                this.productTable.style.display = 'none';
            } else {
                this.noDataMessage.style.display = 'none';
                this.productTable.style.display = 'table';
                this.products.forEach((product, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.description}</td>
                        <td><button class="btn btn-outline-success" onclick="productManager.editProduct(${index})"><i class="far fa-edit"></i></button></td>
                        <td><button class="btn btn-outline-danger" onmouseover="this.classList.remove('btn-outline-danger'); this.classList.add('btn-danger');" onmouseout="this.classList.remove('btn-danger'); this.classList.add('btn-outline-danger');" onclick="productManager.deleteProduct(${index})"><i class="far fa-trash-alt"></i></button></td>
                    `;
                    this.tbody.appendChild(row);
                });
            }
        }

        clearForm() {
            this.productNameInput.value = '';
            this.productCategoryInput.value = '';
            this.productPriceInput.value = '';
            this.productDescriptionInput.value = '';
            this.addProductBtn.textContent = 'Add Product';
            this.editIndex = null;
        }

        validateInputs() {
            const name = this.productNameInput.value.trim();
            const category = this.productCategoryInput.value.trim();
            const price = this.productPriceInput.value.trim();
            const description = this.productDescriptionInput.value.trim();
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
        }

        addOrUpdateProduct() {
            const product = this.validateInputs();
            if (!product) return;

            if (this.editIndex !== null) {
                this.products[this.editIndex] = product;
                this.addProductBtn.textContent = 'Add Product';
            } else {
                this.products.push(product);
            }

            localStorage.setItem('products', JSON.stringify(this.products));
            this.clearForm();
            this.renderTable();
        }

        searchProducts() {
            const query = this.searchBar.value.toLowerCase();
            const filter = this.searchFilter.value;
            const filteredProducts = this.products.filter((product, index) => {
                switch (filter) {
                    case 'name':
                        return product.name.toLowerCase().includes(query);
                    case 'category':
                        return product.category.toLowerCase().includes(query);
                    default:
                        return false;
                }
            });

            this.tbody.innerHTML = '';
            if (filteredProducts.length === 0) {
                this.noResultsAlert.style.display = 'block';
            } else {
                this.noResultsAlert.style.display = 'none';
                filteredProducts.forEach((product, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.description}</td>
                        <td><button class="btn btn-success" onclick="productManager.editProduct(${index})"><i class="fas fa-edit"></i></button></td>
                        <td><button class="btn btn-danger" onclick="productManager.deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button></td>
                    `;
                    this.tbody.appendChild(row);
                });
            }
        }

        validatePriceInput() {
            const pricePattern = /^[0-9]*$/;
            if (!pricePattern.test(this.productPriceInput.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter numbers only.',
                });
                this.productPriceInput.value = this.productPriceInput.value.replace(/[^0-9]/g, '');
            }
        }


        editProduct(index) {
            const product = this.products[index];
            this.productNameInput.value = product.name;
            this.productCategoryInput.value = product.category;
            this.productPriceInput.value = product.price;
            this.productDescriptionInput.value = product.description;
            this.addProductBtn.textContent = 'Update Product';
            this.clearBtn.textContent = 'Cancel';
            this.editIndex = index;
        }

        deleteProduct(index) {
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
                    this.products.splice(index, 1);
                    localStorage.setItem('products', JSON.stringify(this.products));
                    this.renderTable();
                    Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                    );
                }
            });
        }
    }

    window.productManager = new ProductManager();
});
