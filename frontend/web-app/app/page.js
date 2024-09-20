'use client';
import { useRouter } from 'next/navigation'; 

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-lg mx-auto p-6">
        <h1 className="text-xl font-bold mb-6 text-center">Управление заказами</h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-4 w-full"
            onClick={() => {
              router.push(`pages/NewOrder`);
            }}
          >
            Создать новый заказ
          </button>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              router.push(`pages/AllOrders`);
            }}
          >
            Посмотреть все заказы
          </button>
        </div>
      </div>
    </div>
  );
}
