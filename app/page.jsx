"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://kyc-tzxt.onrender.com/price-compare');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              setData(result);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);
   if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="p-1 text-lg">Know your Compitition </h1>
      {data && data.map((item) => (<div>{item.Uline_name}</div>))}
    </div>
  );
}
