'use client';
import { useState, useEffect } from 'react';

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

  const occupancyRate = ((parkingData.occupied / parkingData.total) * 100).toFixed(0);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      {/* 主要顯示卡片 */}
      <div className="max-w-6xl w-full">
        {/* 標題 */}
        <div className="text-center mt-2 mb-10">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8">
            {parkingData.name || '--'}
          </h1>
        </div>

        {/* 主要數據卡片 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

            {/* 剩餘車位 - 主要顯示 */}
            <div className="md:col-span-3 mb-16">
              <div className="bg-white/10 rounded-2xl p-12 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-semibold text-blue-200 mb-8">剩餘車位</h2>
                <div className="relative">
                  <div className={`text-[20rem] md:text-[24rem] font-bold ${getStatusColor()} transition-all duration-500 leading-none`}>
                    {isLoading ? (
                      <div className="animate-pulse">--</div>
                    ) : (
                      parkingData.available
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 總車位數 */}
            <div className="md:col-span-3 mb-16">
              <div className="bg-white/10 rounded-2xl p-12 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-semibold text-blue-200 mb-8">總車位數</h2>
                <div className="relative">
                  <div className={`text-[20rem] md:text-[24rem] font-bold ${getStatusColor()} transition-all duration-500 leading-none`}>
                    {isLoading ? (
                      <div className="animate-pulse">--</div>
                    ) : (
                      parkingData.total
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 進度條 */}
          <div className="mt-8">
            <div className="flex justify-between text-xl md:text-2xl text-blue-200 mb-4">
              <span>車位使用情況</span>
              <span>{parkingData.occupied}/{parkingData.total}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-6">
              <div
                className="bg-gradient-to-r from-green-400 to-red-800 h-6 rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: `${occupancyRate}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
