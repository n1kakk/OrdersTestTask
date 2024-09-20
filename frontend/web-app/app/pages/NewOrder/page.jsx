"use client"; 

import React, { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import { Range } from "react-range";
import { useRouter } from 'next/navigation'; 
import 'react-dadata/dist/react-dadata.css';
import Navigation from '../../components/Navigation'; 


const NewOrder = () => {
  const router = useRouter();
  const [senderCity, setSenderCity] = useState('');
  const [senderAddress, setSenderAddress] = useState('');

  const [recipientCity, setRecipientCity] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  const token = "296d995f568e883470d986efbf3219cf9f7d8fc7";

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const [date, setDate] = useState(minDate);

  const [weight, setWeight] = useState([0.5]);

  const [error, setError] = useState(null);


  const handleSubmit = async(e) =>{
    e.preventDefault();

        if (!senderCity || !senderAddress || !recipientCity || !recipientAddress || !date || weight[0] <= 0) {
          alert('Пожалуйста, заполните все поля');
          return; 
        }

    const orderData = {
      senderCity,
      senderAddress,
      recipientCity,
      recipientAddress,
      weight:weight[0],
      date
    };


    try{
      const response = await fetch("http://localhost:5249/Orders",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      if(!response.ok){
        console.log(orderData);
        throw new Error('Error creating order'+ response.statusText);
      }

      const createdOrder = await response.json();

      router.push(`Orders/${createdOrder.id}`);
    }catch(error){
      setError(error);
    }
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


  const handleSenderAddressSelect = (suggestion) => {
    const address = suggestion.data;
    setSenderCity(address.city);
    setSenderAddress(join([
      address.street_type && address.street ? `${address.street_type} ${address.street}` : '',
      address.house_type && address.house ? `${address.house_type} ${address.house}` : '',
      address.block_type && address.block ? `${address.block_type} ${address.block}` : '',
      address.flat_type && address.flat ? `${address.flat_type} ${address.flat}` : ''
    ]));
  };

  const handleRecipientAddressSelect = (suggestion) => {
    const address = suggestion.data;
    setRecipientCity(address.city);
    setRecipientAddress(join([
      address.street_type && address.street ? `${address.street_type} ${address.street}` : '',
      address.house_type && address.house ? `${address.house_type} ${address.house}` : '',
      address.block_type && address.block ? `${address.block_type} ${address.block}` : '',
      address.flat_type && address.flat ? `${address.flat_type} ${address.flat}` : ''
    ]));
  };

  const join = (arr) => {
    return arr.filter(Boolean).join(', ');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-center flex-grow">Оформление заказа</h1>
            <div className="ml-4"> 
                <Navigation /> 
            </div>
      </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">

          <div className="flex justify-center space-x-6">
            <div className="w-80">
              <h2 className="text-lg font-bold mb-4 text-center">Отправитель</h2>
              <label className="block mb-4">
                <AddressSuggestions
                  token={token}
                  value={senderCity}
                  onChange={(value) => {
                    setSenderCity(value);
                    handleSenderAddressSelect(value);
                  }}
                  inputProps={{
                    className: "w-full px-3 py-2 border-b bg-gray-200 focus:outline-none",
                    placeholder: "Введите город и адрес отправителя",
                  }}
                />
              </label>
              <div className="mb-4">
                <label>Город отправителя</label>
                <input
                  type="text"
                  value={senderCity}
                  readOnly
                  className="w-full px-3 py-2 border-b border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label>Адрес отправителя</label>
                <input
                  type="text"
                  value={senderAddress}
                  readOnly
                  className="w-full px-3 py-2 border-b border-gray-300 bg-white text-black focus:outline-none"

                />
              </div>
            </div>

            <div className="w-80">
              <h2 className="text-lg font-bold mb-4 text-center">Получатель</h2>
              <label className="block mb-4">
                <AddressSuggestions
                  token={token}
                  value={recipientCity}
                  onChange={(value) => {
                    setRecipientCity(value);
                    handleRecipientAddressSelect(value);
                  }}
                  inputProps={{
                    className: "w-full px-3 py-2 border-b bg-gray-200 focus:outline-none",
                    placeholder: "Введите город и адрес получателя",
                  }}
                />
              </label>
              <div className="mb-4">
                <label>Город получателя</label>
                <input
                  type="text"
                  value={recipientCity}
                  readOnly
                  className="w-full px-3 py-2 border-b border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label>Адрес получателя</label>
                <input
                  type="text"
                  value={recipientAddress}
                  readOnly
                  className="w-full px-3 py-2 border-b border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>
            </div>
          </div>

=          <div className="flex justify-center space-x-10">
            <div className="w-80">
            <label className="block mb-2">Дата забора груза</label>
              <label className="block mb-6">
                <input
                  type="date"
                  className="w-full px-3 py-2 border-b border-gray-300 bg-gray-200 text-black focus:outline-none"
                  placeholder="Дата забора груза"
                  min={minDate}
                  onKeyDown={(e) => e.preventDefault()} 
                  onChange={(e) => setDate(e.target.value)} 
                  required
                />
              </label>
            </div>

            <div className="w-80">
              <label className="block mb-2">Вес груза</label>
              <div className="block mb-4">
                <label className="block mb-2 text-black">{weight[0]} кг</label>
                <Range
                  step={0.1}
                  min={0.5}
                  max={30}
                  values={weight}
                  onChange={(values) => setWeight(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#999",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4"> 
            <button type="submit" className="w-full max-w-sm py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
