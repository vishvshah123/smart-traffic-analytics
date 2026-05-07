import React from 'react';
import { LayoutDashboard, Car, AlertTriangle, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
        { icon: <Car size={20} />, label: 'Live Traffic' },
        { icon: <AlertTriangle size={20} />, label: 'Congestion Alerts' },
        { icon: <BarChart3 size={20} />, label: 'Analytics' },
        { icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold text-blue-500 flex items-center gap-2">
                    <Car className="text-blue-500" />
                    TrafficFlow AI
                </h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item, idx) => (
                    <div 
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                            item.active ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </div>
                ))}
            </nav>
            <div className="p-6 border-t border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">System Status</div>
                <div className="flex items-center gap-2 text-sm text-green-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Kafka & Spark Live
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
