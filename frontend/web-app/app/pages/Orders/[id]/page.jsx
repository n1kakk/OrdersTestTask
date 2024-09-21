"use client"; 

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '../../../components/Navigation'; 


const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); 

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5249/Orders/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных заказа');
        }

        if (response.status === 404) {
          setError('Заказ не найден'); 
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setOrder(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Загрузка данных заказа...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="container max-w-lg mx-auto p-6">
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
            Ошибка: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-lg mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-center flex-grow">                  <img src="/img/orderImage.png" alt="Order Image" className="inline-block w-5 h-5 mr-2" />
            Детали заказа</h1>
            <div className="ml-4"> 
                <Navigation /> 
            </div>
      </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                
          <h2 className="text-lg font-bold mb-4">Заказ #{order.id}</h2>
          <h3 className="font-bold">Адрес отправителя</h3>
          <p>г {order.senderCity}</p>
          <p>{order.senderAddress}</p>
          <h3 className="font-bold mt-4">Адрес получателя</h3>
          <p>г {order.recipientCity}</p>
          <p>{order.recipientAddress}</p>
          <h3 className="font-bold mt-4">Дата забора груза</h3>
          <p>{new Date(order.date).toLocaleDateString()}</p>
          <h3 className="font-bold mt-4">Вес груза</h3>
          <p>{order.weight} кг</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
