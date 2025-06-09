'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ParkingData {
  name: string;
  total: number;
  available: number;
  occupied: number;
  remark: string | null;
}

export default function ParkingLotInfo() {
  const [isLoading, setIsLoading] = useState(false);

  // 停車數據
  const [parkingData, setParkingData] = useState<ParkingData>({
    name: '',
    total: 0,
    available: 0,
    occupied: 0,
    remark: null
  });

  const availabilityRate = ((parkingData.available / parkingData.total) * 100).toFixed(0);

  // 自動刷新
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/space');
        const { data } = await response.json();
        if (data) {
          setParkingData(data);
        }
      } catch (error: unknown) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    const interval = setInterval(() => {
      fetchData();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    const rate = parseInt(availabilityRate);
    if (rate <= 10) return 'text-red-500';
    if (rate <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-12 xl:p-6 2xl:p-6">
      {/* 主要顯示卡片 */}
      <div className="max-w-6xl w-full portrait:max-w-6xl landscape:max-w-8xl">

        {/* 主要數據卡片 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 xl:p-6 2xl:p-6 portrait:p-24 landscape:p-20 border border-white/20 shadow-2xl">
          <div className="flex justify-start mb-16 portrait:mb-16 landscape:mb-12">
            <Image
              className="w-full h-full portrait:max-w-xl landscape:max-w-2xl xl:max-w-md xl:w-auto xl:h-18"
              src="/Applied_Materials_Inc._Logo.svg.png"
              alt="logo"
              width={2560}
              height={646}
            />
          </div>
          <div className="grid grid-cols-1 text-center">
            {/* 剩餘車位 - 主要顯示 */}
            <div className="bg-white/10 rounded-2xl p-16 portrait:p-20 landscape:p-12 border border-white/20">
              <h2 className="text-start text-12xl md:text-8xl portrait:text-8xl landscape:text-6xl font-semibold text-blue-200 mb-4 portrait:mb-4 landscape:mb-4">專用剩餘車位</h2>
              <div className="relative">
                <div className={`text-[24rem] md:text-[24rem] portrait:text-[24rem] landscape:text-[30rem] font-bold ${getStatusColor()} transition-all duration-500 leading-none`}>
                  {isLoading ? (
                    <div className="animate-pulse">--</div>
                  ) : (
                    parkingData.available
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
