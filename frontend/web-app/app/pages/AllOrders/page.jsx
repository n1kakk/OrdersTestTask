﻿'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation'; 

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noOrders, setNoOrders] = useState(false); 
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5249/Orders/orders');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
    
            const data = await response.json();
            
            if (JSON.stringify(data) !== JSON.stringify(orders)) {
                setOrders(data);
                setNoOrders(data.length === 0);
            }
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); 

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="container max-w-lg mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold text-center flex-grow">                 
                        <img src="/img/orderImage.png" alt="Order Image" className="inline-block w-5 h-5 mr-2" />
                    Список заказов
                    </h1>
                    <div className="ml-4"> 
                        <Navigation /> 
                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center">Загрузка заказов...</div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        Ошибка: {error}
                    </div>
                ) : noOrders ? (
                    <div className="text-center text-red-500">
                        Нет доступных заказов.
                    </div>
                ) : (
                    <ul className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
                        {orders.map((order) => (
                            <li
                                key={order.id}
                                className="border-b py-2 cursor-pointer"
                                onClick={() => router.push(`Orders/${order.id}`)} 
                            >
                                Заказ #{order.id}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllOrders;
