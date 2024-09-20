'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation'; 

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noOrders, setNoOrders] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5249/Orders/orders');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }

                if (response.status === 204) {
                    setOrders([]);
                    setNoOrders(true);
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();
                setOrders(data);
                setIsLoading(false);

                if (data.length === 0) {
                    setNoOrders(true);
                } else {
                    setNoOrders(false);
                }
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="container max-w-lg mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-center flex-grow">Список заказов</h1>
            <div className="ml-4"> {/* Отступ между заголовком и кнопкой */}
                <Navigation /> {/* Если Navigation — это кнопка или компонент навигации */}
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
