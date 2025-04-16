import express from "express"
import { getAllOrders, createOrder, updateStatusOrder, deleteOrder } from "../controllers/orderC"
import { verifyAddOrder, verifyEditStatus } from "../middlewares/verifyOrder"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())
app.get(`/`, [verifyToken, verifyRole(["ADMIN","USER"])], getAllOrders)
app.post(`/create`, [verifyToken, verifyRole(["ADMIN","USER"]), verifyAddOrder], createOrder)
app.put(`/edit/:id`, [verifyToken, verifyRole(["ADMIN","USER"]), verifyEditStatus], updateStatusOrder)
app.delete(`/delete/:id`, [verifyToken, verifyRole(["ADMIN","USER"])], deleteOrder)

export default app