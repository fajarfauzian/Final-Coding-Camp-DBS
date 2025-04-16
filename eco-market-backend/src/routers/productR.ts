import express from "express";
import { getAllProduct,createProduct,updateProduct, deleteProduct} from "../controllers/productC";
import { verifyAddProduct, verifyUpdateProduct } from "../middlewares/verifyProduct";
import uploadFileProduct from "../middlewares/productUpload";
import { verifyRole, verifyToken } from "../middlewares/authorization";

const app = express()
app.use(express.json())

app.get(`/`,[verifyToken, verifyRole(["ADMIN","USER"])],getAllProduct)
app.post(`/create`,[verifyToken,verifyRole(["ADMIN"]),uploadFileProduct.single("picture"),verifyAddProduct],createProduct)
app.put(`/:id`,[verifyToken,verifyRole(["ADMIN"]),uploadFileProduct.single("picture") ,verifyUpdateProduct],updateProduct)
app.delete(`/:id`,[verifyToken,verifyRole(["ADMIN"])],deleteProduct)

export default app