import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getAllOrders = async (request: Request, response: Response) => {
  try {
    // mendapatkan data yang diminta (data telah dikirim dari permintaan)
    const { search } = request.query;

    // proses untuk mendapatkan pesanan, berisi cara mencari nama atau nomor tabel pesanan pelanggan berdasarkan kata kunci yang dikirim
    const allOrders = await prisma.order.findMany({
      where: {
        OR: [{ customer: { contains: search?.toString() || "" } }],
      },
      orderBy: { createdAt: "desc" }, // mengurutkan berdasarkan tanggal urutan menurun
      include: {
        order_list: true,
      }, //menyertakan detail pesanan (barang yang dijual),
    });
    return response
      .json({
        status: true,
        data: allOrders,
        message: `Order list has retrieved`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
export const createOrder = async (request: Request, response: Response) => {
  try {
    // mendapatkan data yang diminta (data telah dikirim dari permintaan)
    const { customer, payment_method, status, orderlists } = request.body;
    const user = request.body.user;
    const uuid = uuidv4();
    /**
     * asumsikan bahwa “orderlists” adalah sebuah array objek yang memiliki kunci:
     * productId, kuantitas, catatan
     * */

    // perulangan detail pesanan untuk memeriksa produk dan menghitung total harga
    let total_price = 0;
    for (let index = 0; index < orderlists.length; index++) {
      const { productId } = orderlists[index];
      const detailProduct = await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });
      if (!detailProduct)
        return response.status(200).json({
          status: false,
          message: `Product with id ${productId} is not found`,
        });
      total_price += detailProduct.price * orderlists[index].quantity;
    }

    // proses untuk menyimpan pesanan baru
    const newOrder = await prisma.order.create({
      data: {
        uuid,
        customer,
        total_price,
        payment_method,
        status,
        idUser: user.idUser,
      },
    });

    // perulangan detail Pesanan untuk disimpan dalam database
    for (let index = 0; index < orderlists.length; index++) {
      const uuid = uuidv4();
      const { productId, quantity, note } = orderlists[index];
      await prisma.order_list.create({
        data: {
          uuid,
          idOrder: newOrder.id,
          idProduct: Number(productId),
          quantity: Number(quantity),
          note,
        },
      });
    }
    return response
      .json({
        status: true,
        data: newOrder,
        message: `New Order has created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
export const updateStatusOrder = async (
  request: Request,
  response: Response
) => {
  try {
    // mendapatkan id dari id pesanan yang dikirim dalam parameter URL
    const { id } = request.params;
    // mendapatkan data yang diminta (data telah dikirim dari permintaan)
    const { status } = request.body;
    const user = request.body.user;

    // pastikan data sudah ada di database
    const findOrder = await prisma.order.findFirst({
      where: { id: Number(id) },
    });
    if (!findOrder)
      return response
        .status(200)
        .json({ status: false, message: `Order is not found` });

    // proses untuk memperbarui data produk
    const updatedStatus = await prisma.order.update({
      data: {
        status: status || findOrder.status,
        idUser: user.id ? user.idOrder : findOrder.idUser,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updatedStatus,
        message: `Order has updated`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
export const deleteOrder = async (request: Request, response: Response) => {
  try {
    // mendapatkan id dari id pesanan yang dikirim dalam parameter URL
    const { id } = request.params;

    // pastikan data sudah ada di database
    const findOrder = await prisma.order.findFirst({
      where: { id: Number(id) },
    });
    if (!findOrder)
      return response
        .status(200)
        .json({ status: false, message: `Order is not found` });
    // proses untuk menghapus detail pesanan
    let deleteOrderList = await prisma.order_list.deleteMany({
      where: { idOrder: Number(id) },
    });
    // proses untuk menghapus Pesanan
    let deleteOrder = await prisma.order.delete({ where: { id: Number(id) } });

    return response
      .json({
        status: true,
        data: deleteOrder,
        message: `Order has deleted`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
