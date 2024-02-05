//const fs = require('fs').promises;
import fsPromises from 'fs/promises';

 export default class ProductManager {

    constructor() {

        this.products = [];

        this.filePath = './productos.json';

    }

    async loadProducts() {

        try {

            const data = await fsPromises.readFile(this.filePath, 'utf-8');

            this.products = JSON.parse(data);

        } catch (error) {

            console.log('Error reading products file:', error.message);

            this.products = [];

        }

    }

    async saveProducts() {

        try {

            await fsPromises.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');

        } catch (error) {

            console.log('Error writing products file:', error.message);

        }

    }

    async addProduct(title, description, price, img, code, stock) {

        if (!title || !description || !price || !img || !code || !stock) {

            console.log('Error: Todos los campos son obligatorios');

            return;

        }

        if (this.products.some((product) => product.code === code)) {

            console.log('Error: El código de producto ya existe');

            return;

        }

        const newProduct = {

            id: this.products.length + 1,

            title,

            description,

            price,

            img,

            code,

            stock

        };

        this.products.push(newProduct);

        await this.saveProducts();

    }

    async getProduct() {

        await this.loadProducts();

        return this.products;

    }

    async getProductById(id) {

        await this.loadProducts();

        const productFilter = this.products.find((product) => product.id === id);

        if (productFilter) {

            return productFilter;

        } else {

            return 'Not Found';

        }

    }
    async deleteProduct(id) {
        await this.loadProducts();
        this.products = this.products.filter(products=> products.id != id)
        await this.saveProducts()
        
    }
    async upDateProduct(id, updatedFields){
        await this.loadProducts();
        const productIndex = this.products.findIndex((product) => product.id === id);
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        await this.saveProducts();
        
    }
}






/*const productos = new ProductManager();

//async function test() {

    await productos.getProduct();

    await productos.addProduct('titulo1', 'descripcion1', 1000, 'img1', 'abc123', 5);

    await productos.addProduct('titulo2', 'descripcion2', 1000, 'img2', 'abc124', 10);

    await productos.addProduct('titulo3', 'descripcion3',1000,'img3','abc125', 8);

    await productos.addProduct('titulo4', 'descripcion4', 1000, 'img4', 'abc126', 5);

    await productos.addProduct('titulo5', 'descripcion5', 1000, 'img5', 'abc127', 5);

    await productos.addProduct('titulo6', 'descripcion6', 1000, 'img6', 'abc128', 5);

    await productos.addProduct('titulo7', 'descripcion7', 1000, 'img7', 'abc129', 5);

    await productos.addProduct('titulo8', 'descripcion8', 1000, 'img8', 'abc130', 5);

    await productos.addProduct('titulo9', 'descripcion9', 1000, 'img9', 'abc131', 5);

    await productos.addProduct('titulo10', 'descripcion10', 1000, 'img10', 'abc132', 5);

   const product = await productos.getProductById(2);

  console.log(product);

}

test()

//productos.deleteProduct(2)
//const products =  productos.getProduct();
//console.log(products);
//productos.upDateProduct(1, { title: 'Nuevo título', price: 2000 });*/

