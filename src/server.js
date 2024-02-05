import  ProductManager from "./fileSystem.js"
import  express  from "express"

const app = express();
app.use(express.urlencoded({extended: true}));


const PORT = 8080; 
const productos = new ProductManager()


app.get("/products", async (req, res) =>{
    try {
    const products = await productos.getProduct()
    const limit = parseInt(req.query.limit);

   // if (limit > products.length) {
       // res.send ( "te pasate del limite")
    //} no logre esta parte de codigo si me pasaba del limite me funcionaba pero cuando queria volver atras se me colgaba

    if(!limit) {
        return res.send (products)
    } 
   const limitProduct = products.slice(0, limit)
    res.send ( limitProduct )
} catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
});

app.get("/products/:id", async (req, res) =>{
    try {
    const id = parseInt(req.params.id)
    const products = await productos.getProduct()
    const productFilter = products.find((product) => product.id === id);

        if (productFilter) {
            res.send(productFilter);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
      }
})

app.listen (PORT, () =>{
    console.log(`Server run on port: ${PORT}`);
});