import React, { useState, useEffect } from "react";
import "./App.css";
import { IoMdAddCircle } from "react-icons/io";
import { CgMathMinus } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import Swal from "sweetalert2";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  id: number;
  quantity: number;
}

const OrderForm: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 15 },
    { id: 3, name: "Producto 3", price: 20 },
    // Agrega más productos si es necesario
  ]);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderId, setOrderId] = useState<string>(generateShortId());

  useEffect(() => {
    const socket = io("http://52.22.232.79:4000");//Cambiar hacia socket desplegado
    socket.on("receiveData", (orden: any) => {
      console.log(orden);
      Swal.fire({
        title: "Pago realizado",
        text: JSON.stringify(orden),
        icon: "success",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function generateShortId() {
    const fullId = uuidv4();
    return fullId.substr(0, 8);
  }

  const handleAddToOrder = (productId: number) => {
    const existingItem = orderItems.find((item) => item.id === productId);
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([...orderItems, { id: productId, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (productId: number) => {
    const existingItemIndex = orderItems.findIndex(
      (item) => item.id === productId
    );
    if (existingItemIndex !== -1) {
      const updatedOrderItems = [...orderItems];
      if (updatedOrderItems[existingItemIndex].quantity === 1) {
        updatedOrderItems.splice(existingItemIndex, 1);
      } else {
        updatedOrderItems[existingItemIndex].quantity -= 1;
      }
      setOrderItems(updatedOrderItems);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = orderItems.map((item) => {
        const product = products.find((prod) => prod.id === item.id);
        return {
          id_order: orderId,
          name: product?.name,
          price: product?.price,
          cant: item.quantity,
        };
      });

      const response = await fetch("http://52.70.43.169:3000/api/pedidos", { //Cambiar hacia la url de la api desplegada
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Order submitted successfully!");
        Swal.fire({
          title: "Pedido enviado",
          text: "¡Tu pedido ha sido enviado con éxito!",
          icon: "success",
        });
        setOrderItems([]);
        setOrderId(generateShortId());
      } else {
        console.error("Failed to submit order");
        Swal.fire({
          title: "Error",
          text: "Error al enviar el pedido. Por favor, inténtalo de nuevo más tarde.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      Swal.fire({
        title: "Error",
        text: "Error al enviar el pedido. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="Container">
      <section className="section">
        <h3>Productos</h3>
        {products.map((product) => (
          <div className="productos" key={product.id}>
            <p>
              {product.name} - ${product.price}
            </p>
            <div className="actions">
              <button onClick={() => handleAddToOrder(product.id)}>
                <IoMdAddCircle size={"20px"} />
              </button>
              <button onClick={() => handleRemoveFromOrder(product.id)}>
                <CgMathMinus size={"20px"} />
              </button>
            </div>
          </div>
        ))}
      </section>
      <section className="order-form">
        <h3>Detalle del Pedido</h3>
        <h4>ID de Pedido: {orderId}</h4>
        {orderItems.map((item) => (
          <div key={item.id}>
            <p>
              {products.find((product) => product.id === item.id)?.name} - Cantidad: {item.quantity}
            </p>
          </div>
        ))}
        {orderItems.length > 0 && (
          <button onClick={handleSubmitOrder}>Enviar Pedido</button>
        )}
      </section>
    </div>
  );
};

export default OrderForm;
