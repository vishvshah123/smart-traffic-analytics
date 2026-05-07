import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Car, Zap, AlertCircle, MapPin } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [liveData, setLiveData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('http://localhost:5000/api/traffic/stats');
            const liveRes = await axios.get('http://localhost:5000/api/traffic');
            const alertRes = await axios.get('http://localhost:5000/api/traffic/alerts');
            
            setStats(statsRes.data);
            setLiveData(liveRes.data);
            setAlerts(alertRes.data);
        } catch (err) {
            console.error("API Error:", err);
            // Fallback mock data if server not running
            setStats([
                { _id: 'Andheri', vehicleCount: 450, avgSpeed: 32 },
                { _id: 'Bandra', vehicleCount: 320, avgSpeed: 45 },
                { _id: 'Colaba', vehicleCount: 210, avgSpeed: 55 },
                { _id: 'Dadar', vehicleCount: 540, avgSpeed: 18 },
            ]);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    const totalVehicles = stats.reduce((acc, curr) => acc + curr.vehicleCount, 0);
    const avgSpeedTotal = stats.length > 0 
        ? (stats.reduce((acc, curr) => acc + curr.avgSpeed, 0) / stats.length).toFixed(1) 
        : 0;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Traffic Intelligence</h2>
                    <p className="text-slate-400">Real-time big data analytics for urban congestion monitoring.</p>
                </div>
                <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 text-sm">
                    {new Date().toLocaleTimeString()} | 07 May 2026
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryCard title="Total Vehicles" value={totalVehicles} icon={<Car size={24}/>} color="text-blue-500" />
                <SummaryCard title="Avg Speed" value={`${avgSpeedTotal} km/h`} icon={<Zap size={24}/>} color="text-green-500" />
                <SummaryCard title="Active Areas" value={stats.length} icon={<MapPin size={24}/>} color="text-yellow-500" />
                <SummaryCard title="Congestion Alerts" value={alerts.length} icon={<AlertCircle size={24}/>} color="text-red-500" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6">Traffic Volume by Area</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="_id" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Bar dataKey="vehicleCount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6">Area-wise Speed Distribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats}>
                                <defs>
                                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="_id" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="avgSpeed" stroke="#10b981" fillOpacity={1} fill="url(#colorSpeed)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Live Feed & Alerts Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6">Live Traffic Stream</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-800 text-slate-400 text-sm">
                                <tr>
                                    <th className="pb-3 px-2">Vehicle ID</th>
                                    <th className="pb-3 px-2">Area</th>
                                    <th className="pb-3 px-2">Type</th>
                                    <th className="pb-3 px-2">Speed</th>
                                    <th className="pb-3 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {liveData.length > 0 ? liveData.map((item, idx) => (
                                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                        <td className="py-3 px-2">{item.vehicle_id}</td>
                                        <td className="py-3 px-2">{item.area}</td>
                                        <td className="py-3 px-2">{item.vehicle_type}</td>
                                        <td className="py-3 px-2 font-mono">{item.speed} km/h</td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                                                item.speed < 20 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                            }`}>
                                                {item.speed < 20 ? 'Congested' : 'Smooth'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="py-4 text-center text-slate-500">Waiting for stream...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <AlertCircle className="text-red-500" />
                        Critical Alerts
                    </h3>
                    <div className="space-y-4">
                        {alerts.length > 0 ? alerts.map((alert, idx) => (
                            <div key={idx} className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded">
                                <div className="text-sm font-bold text-red-500">Slow Traffic in {alert.area}</div>
                                <div className="text-xs text-slate-400 mt-1">Vehicle {alert.vehicle_id} reported speed {alert.speed} km/h</div>
                                <div className="text-[10px] text-slate-500 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</div>
                            </div>
                        )) : (
                            <div className="text-slate-500 text-sm italic">No active congestion alerts.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value, icon, color }) => (
    <div className="glass-card p-6 flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-slate-800/50 ${color}`}>
            {icon}
        </div>
        <div>
            <div className="text-sm text-slate-400">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    </div>
);

export default Dashboard;
