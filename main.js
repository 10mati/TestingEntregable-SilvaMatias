
class productManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !img || !code || !stock) {
          console.log("Error: Todos los campos son obligatorios");
          return;
        }
    
        if (this.products.some((product) => product.code === code)) {
          console.log("Error: El código de producto ya existe");
          return;
        }
          const newProducts = {
                id : this.products.length +1,
                title,
                description,
                price,
                img,
                code,
                stock
             };
        this.products.push(newProducts)
    }
    getProduct() {
        return this.products
    }
    getProductById(id){
        const product = this.products.find((product) => product.id === id)
        if (product){
            return product
    }   else {
          return "Not Found"
    }
    }
}

const productos = new productManager();

console.log (productos.getProduct());

// agregando los productos

productos.addProduct("titulo1", "descripcion1",1000,"img1","abc123", 5);
productos.addProduct("titulo2", "descripcion2",1000,"img2","abc124", 10);
productos.addProduct("titulo3", "descripcion3",1000,"img3","abc125", 8);

console.log(productos.getProductById(5));
