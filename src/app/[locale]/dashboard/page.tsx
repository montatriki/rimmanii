'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Calendar,
    Settings,
    Search,
    Bell,
    LayoutDashboard,
    MessageSquare,
    FileText,
    MoreVertical,
    Activity,
    History,
    TrendingUp,
    CreditCard,
    LogOut
} from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string, fullName: string, role: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [activeMenu, setActiveMenu] = useState<{ id: string, type: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchDashboardData(parsedUser);
    }, [router]);

    const fetchDashboardData = async (currUser: any) => {
        try {
            const queryBody = currUser.role === 'ADMIN' ? `
                query GetAdminData {
                    adminStats {
                        totalUsers
                        activeAppointments
                        revenueMonth
                        retentionRate
                    }
                    allUsers {
                        id
                        fullName
                        email
                        role
                    }
                    allAppointments {
                        id
                        date
                        status
                        user { fullName }
                        service { name }
                    }
                }
            ` : `
                query GetClientData($userId: ID!) {
                    appointments(userId: $userId) {
                        id
                        date
                        status
                        service { name }
                    }
                    clinicalProgress(userId: $userId) {
                        treatmentName
                        progressPercent
                        status
                    }
                }
            `;

            const res = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: queryBody,
                    variables: { userId: currUser.id }
                })
            });

            const { data } = await res.json();
            setDashboardData(data);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (type: string, id: string, action: string, value?: string) => {
        let queryBody = '';
        let variables = { id };

        if (type === 'appointment') {
            if (action === 'status') {
                queryBody = `mutation { updateAppointmentStatus(id: "${id}", status: "${value}") { id status } }`;
            } else if (action === 'delete') {
                queryBody = `mutation { deleteAppointment(id: "${id}") }`;
            }
        } else if (type === 'user') {
            if (action === 'role') {
                queryBody = `mutation { toggleUserStatus(id: "${id}", role: "${value}") { id role } }`;
            }
        }

        if (!queryBody) return;

        try {
            await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: queryBody })
            });
            fetchDashboardData(user);
            setActiveMenu(null);
        } catch (err) {
            console.error('Action failed:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

    if (user?.role === 'ADMIN') {
        const adminTabs = [
            { icon: LayoutDashboard, label: "Overview" },
            { icon: Calendar, label: "Appointments" },
            { icon: Settings, label: "Users" },
            { icon: FileText, label: "Services" },
            { icon: MessageSquare, label: "Consultations" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Settings" },
        ];

        return (
            <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-outfit">
                {/* Admin Sidebar */}
                <aside className="w-80 glass border-r border-white/10 hidden xl:flex flex-col p-8 sticky top-0 h-screen">
                    <Link href="/" className="text-3xl font-black mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">RIM ADMIN</Link>

                    <nav className="space-y-2 flex-grow">
                        {adminTabs.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(item.label)}
                                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.label
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-foreground/40 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <div className="glass p-6 rounded-3xl flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-primary/20 flex items-center justify-center">
                                <span className="font-bold text-xl text-primary">{user.fullName.charAt(0)}</span>
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-bold truncate max-w-[120px]">{user.fullName}</p>
                                <p className="text-[10px] text-foreground/40 font-black uppercase">Administrator</p>
                            </div>
                            <button onClick={handleLogout} className="text-foreground/20 hover:text-secondary transition-colors"><LogOut size={18} /></button>
                        </div>
                    </div>
                </aside>

                <main className="flex-grow overflow-y-auto max-h-screen w-full p-4 md:p-8">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                        <div>
                            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">System Control</p>
                            <h1 className="text-3xl md:text-4xl font-black">{activeTab}</h1>
                        </div>
                        <div className="flex items-center space-x-4 self-end md:self-auto">
                            <div className="relative group hidden md:block">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search command..."
                                    className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary transition-all w-64"
                                />
                            </div>
                            <button className="glass p-3 rounded-2xl relative text-foreground/60 hover:text-primary transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
                            </button>
                        </div>
                    </header>

                    {activeTab === 'Overview' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Revenue", val: `$${dashboardData?.adminStats?.revenueMonth?.toLocaleString() || '0'}`, sub: "+12.5%", icon: TrendingUp, color: "primary" },
                                    { label: "Clients", val: dashboardData?.adminStats?.totalUsers?.toString() || '0', sub: "New this month", icon: Activity, color: "secondary" },
                                    { label: "Retention", val: `${dashboardData?.adminStats?.retentionRate || '0'}%`, sub: "+2.1%", icon: History, color: "accent" },
                                    { label: "Active Appts", val: dashboardData?.adminStats?.activeAppointments?.toString() || '0', sub: "Current month", icon: Calendar, color: "primary" },
                                ].map((stat, i) => (
                                    <div key={i} className="glass p-8 rounded-[2.5rem] group hover:border-primary/20 transition-all">
                                        <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <p className="text-3xl font-black mb-1">{stat.val}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{stat.label}</p>
                                            <p className="text-[10px] font-black text-green-500">{stat.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <section className="glass p-10 rounded-[3rem]">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black">Performance Chart</h3>
                                        <select className="bg-transparent border-none text-[10px] font-black uppercase text-foreground/40 focus:ring-0 cursor-pointer">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                        </select>
                                    </div>
                                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                className="flex-grow bg-gradient-to-t from-primary/20 to-primary rounded-t-xl"
                                                transition={{ delay: i * 0.1, duration: 1 }}
                                            />
                                        ))}
                                    </div>
                                </section>

                                <section className="glass p-10 rounded-[3rem]">
                                    <h3 className="text-xl font-black mb-8">Recent Activities</h3>
                                    <div className="space-y-6">
                                        {[
                                            { user: "Sarah J.", action: "Booked Dermotherapy", time: "2 mins ago" },
                                            { user: "Michael R.", action: "Modified Reservation", time: "1 hour ago" },
                                            { user: "Elena P.", action: "Completed Payment", time: "3 hours ago" },
                                            { user: "Admin", action: "Updated Service Prices", time: "5 hours ago" },
                                        ].map((act, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/10" />
                                                    <div>
                                                        <p className="text-sm font-bold">{act.user}</p>
                                                        <p className="text-[10px] text-foreground/40">{act.action}</p>
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-foreground/30 font-bold uppercase">{act.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Users' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] overflow-hidden">
                            <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h3 className="text-xl font-black">Client Management</h3>
                                <div className="flex items-center gap-4">
                                    <button className="btn-primary py-3 px-6 text-xs">Add New User</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-foreground/40 text-[10px] uppercase font-black tracking-widest">
                                        <tr>
                                            <th className="p-8">Name</th>
                                            <th className="p-8">Status</th>
                                            <th className="p-8">Last Treatment</th>
                                            <th className="p-8">Join Date</th>
                                            <th className="p-8 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {dashboardData?.allUsers?.map((u: any, i: number) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-8 flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">{u.fullName?.charAt(0)}</div>
                                                    <div>
                                                        <p className="font-bold">{u.fullName}</p>
                                                        <p className="text-[10px] text-foreground/40">{u.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500' : 'bg-green-500/10 text-green-500'
                                                        }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="p-8 text-sm text-foreground/60">{u.role === 'ADMIN' ? 'N/A' : 'Last Consultation'}</td>
                                                <td className="p-8 text-sm text-foreground/40 whitespace-nowrap">Feb 2026</td>
                                                <td className="p-8 text-right relative">
                                                    <button
                                                        onClick={() => setActiveMenu(prev => prev?.id === u.id ? null : { id: u.id, type: 'user' })}
                                                        className="inline-block text-foreground/20 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
                                                    >
                                                        <MoreVertical size={20} />
                                                    </button>
                                                    {activeMenu && activeMenu.id === u.id && activeMenu.type === 'user' && (
                                                        <div className="absolute right-8 top-12 z-50 glass border border-white/10 rounded-2xl p-2 w-48 shadow-2xl backdrop-blur-3xl">
                                                            <button onClick={() => handleAction('user', u.id, 'role', u.role === 'ADMIN' ? 'CLIENT' : 'ADMIN')} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 rounded-xl flex items-center space-x-2">
                                                                <Settings size={14} />
                                                                <span>{u.role === 'ADMIN' ? 'Revoke Admin' : 'Make Admin'}</span>
                                                            </button>
                                                            <button className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 rounded-xl flex items-center space-x-2 text-red-500">
                                                                <LogOut size={14} />
                                                                <span>Block User</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Appointments' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] overflow-hidden">
                            <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h3 className="text-xl font-black">All Appointments</h3>
                                <div className="flex items-center gap-4">
                                    <button className="btn-primary py-3 px-6 text-xs">Schedule New</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-foreground/40 text-[10px] uppercase font-black tracking-widest">
                                        <tr>
                                            <th className="p-8">Client</th>
                                            <th className="p-8">Service</th>
                                            <th className="p-8">Date & Time</th>
                                            <th className="p-8">Status</th>
                                            <th className="p-8 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {dashboardData?.allAppointments?.map((apt: any, i: number) => {
                                            const date = new Date(apt.date);
                                            return (
                                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                    <td className="p-8">
                                                        <span className="font-bold">{apt.user?.fullName || 'Anonymous'}</span>
                                                    </td>
                                                    <td className="p-8 text-sm text-foreground/60">{apt.service?.name}</td>
                                                    <td className="p-8 text-sm text-foreground/40">
                                                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<br />
                                                        <span className="text-[10px] uppercase font-black">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </td>
                                                    <td className="p-8">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${apt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                                            }`}>
                                                            {apt.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-8 text-right relative">
                                                        <button
                                                            onClick={() => setActiveMenu(prev => prev?.id === apt.id ? null : { id: apt.id, type: 'appointment' })}
                                                            className="inline-block text-foreground/20 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
                                                        >
                                                            <MoreVertical size={20} />
                                                        </button>
                                                        {activeMenu && activeMenu.id === apt.id && activeMenu.type === 'appointment' && (
                                                            <div className="absolute right-8 top-12 z-50 glass border border-white/10 rounded-2xl p-2 w-48 shadow-2xl backdrop-blur-3xl">
                                                                <button onClick={() => handleAction('appointment', apt.id, 'status', 'CONFIRMED')} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 rounded-xl flex items-center space-x-2 text-green-500">
                                                                    <Activity size={14} />
                                                                    <span>Confirm</span>
                                                                </button>
                                                                <button onClick={() => handleAction('appointment', apt.id, 'status', 'CANCELLED')} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 rounded-xl flex items-center space-x-2 text-yellow-500">
                                                                    <History size={14} />
                                                                    <span>Cancel</span>
                                                                </button>
                                                                <div className="h-px bg-white/5 my-2" />
                                                                <button onClick={() => handleAction('appointment', apt.id, 'delete')} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 rounded-xl flex items-center space-x-2 text-red-500">
                                                                    <LogOut size={14} />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {(!dashboardData?.allAppointments || dashboardData.allAppointments.length === 0) && (
                                            <tr>
                                                <td colSpan={5} className="p-20 text-center text-foreground/40 font-bold uppercase tracking-widest text-xs">No entries found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'Overview' && activeTab !== 'Users' && activeTab !== 'Appointments' && (
                        <div className="glass p-20 rounded-[3rem] text-center">
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mx-auto mb-8 text-foreground/20">
                                <Settings size={40} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">{activeTab} Section</h3>
                            <p className="text-foreground/40 max-w-md mx-auto">This management interface is currently being optimized for high-performance controls.</p>
                            <button className="btn-outline mt-10 py-4 px-10 text-xs uppercase tracking-widest font-black" onClick={() => setActiveTab('Overview')}>Back to Overview</button>
                        </div>
                    )}
                </main>
                {activeMenu && (
                    <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setActiveMenu(null)}
                    />
                )}
            </div>
        );
    }

    // Client Dashboard (Existing code mostly)
    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-80 glass border-r border-white/10 hidden xl:flex flex-col p-8 sticky top-0 h-screen">
                <Link href="/" className="text-3xl font-black mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">RIM</Link>

                <nav className="space-y-2 flex-grow">
                    {[
                        { icon: LayoutDashboard, label: "Overview", active: true },
                        { icon: Calendar, label: "Appointments" },
                        { icon: FileText, label: "My Records" },
                        { icon: MessageSquare, label: "Consultations" },
                        { icon: BarChart3, label: "My Progress" },
                        { icon: CreditCard, label: "Billing" },
                        { icon: Settings, label: "Settings" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/40 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <div className="glass p-6 rounded-3xl flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                            <Image src="/assets/WhatsApp Image 2026-02-06 at 22.05.38.jpeg" width={48} height={48} className="object-cover" alt="User" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-bold">{user?.fullName || 'James Wilson'}</p>
                            <p className="text-[10px] text-foreground/40 font-black uppercase">Gold Member</p>
                        </div>
                        <button onClick={handleLogout} className="text-foreground/20 hover:text-secondary transition-colors"><LogOut size={18} /></button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto max-h-screen w-full">
                <header className="p-4 md:p-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-3xl z-40 border-b border-white/5">
                    <div className="flex items-center space-x-4 flex-grow max-w-xl">
                        <Link href="/" className="xl:hidden text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mr-4">RIM</Link>
                        <div className="relative w-full">
                            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-6 ml-4 md:ml-8">
                        <button className="relative w-10 h-10 md:w-12 md:h-12 glass rounded-xl md:rounded-2xl flex items-center justify-center text-foreground/60 hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-background" />
                        </button>
                        <div className="hidden sm:block">
                            <p className="text-[10px] font-black uppercase text-foreground/30 text-right leading-none mb-1">Last Visit</p>
                            <p className="text-xs md:text-sm font-bold whitespace-nowrap">Jan 12, 2026</p>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
                        {[
                            { label: "Active", val: "03", icon: Activity, color: "primary" },
                            { label: "Done", val: "12", icon: History, color: "secondary" },
                            { label: "Progress", val: "84%", icon: TrendingUp, color: "accent" },
                            { label: "Reminders", val: "02", icon: Bell, color: "primary" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group hover:border-white/20 transition-all"
                            >
                                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-${stat.color}/10 text-${stat.color} w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <p className="text-xl md:text-3xl font-black mb-1 md:mb-2">{stat.val}</p>
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Session Card */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="flex items-center justify-between mb-6 md:mb-8">
                                    <h3 className="text-xl md:text-2xl font-black">Treatment Journey</h3>
                                    <button className="text-[9px] md:text-[10px] font-black uppercase text-primary hover:underline">View All</button>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    {dashboardData?.clinicalProgress?.map((t: any, i: number) => (
                                        <div key={i} className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl relative">
                                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                                <p className="font-bold text-base md:text-lg">{t.treatmentName}</p>
                                                <p className="text-xs md:text-sm font-black text-primary">{t.progressPercent}%</p>
                                            </div>
                                            <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${t.progressPercent}%` }}
                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {(!dashboardData?.clinicalProgress || dashboardData.clinicalProgress.length === 0) && (
                                        <div className="glass p-12 rounded-3xl text-center text-foreground/40">
                                            No treatment records found.
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Clinical Progress</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    {[4, 5, 8].map((imgIdx) => (
                                        <div key={imgIdx} className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden glass group cursor-pointer relative">
                                            <Image
                                                src={`/assets/WhatsApp Image 2026-02-06 at 22.05.39 (${imgIdx}).jpeg`}
                                                alt="Progress"
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center uppercase font-black text-[10px] tracking-widest">
                                                Zoom View
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8 md:space-y-12">
                            <section className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black">Upcoming</h3>
                                    <button className="p-2 hover:bg-white/10 rounded-xl"><MoreVertical size={16} /></button>
                                </div>

                                <div className="space-y-8">
                                    {dashboardData?.appointments?.map((apt: any, i: number) => {
                                        const date = new Date(apt.date);
                                        return (
                                            <div key={i} className="flex items-start space-x-6 relative">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-3 h-3 rounded-full border-2 border-background ${apt.status === 'CONFIRMED' ? 'bg-primary' : 'bg-gray-500'}`} />
                                                    {i < dashboardData.appointments.length - 1 && <div className="w-0.5 h-16 bg-white/5 mt-2" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-bold text-sm leading-none">{apt.service?.name}</p>
                                                    <p className="text-[10px] text-foreground/40 font-bold uppercase">
                                                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                    <p className="text-[10px] font-black text-primary uppercase mt-2">{apt.status}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {(!dashboardData?.appointments || dashboardData.appointments.length === 0) && (
                                        <p className="text-center text-foreground/40 text-xs py-8">No upcoming appointments.</p>
                                    )}
                                </div>

                                <button className="btn-primary w-full py-4 text-xs mt-12 flex items-center justify-center space-x-2">
                                    <Calendar size={14} />
                                    <span>New Appointment</span>
                                </button>
                            </section>

                            <div className="glass p-10 rounded-[3rem] border-secondary/20">
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                                    <MessageSquare size={32} />
                                </div>
                                <h4 className="text-xl font-black mb-4">Direct Channel</h4>
                                <p className="text-xs text-foreground/40 leading-relaxed mb-8">You have a direct encrypted line to your lead consultant Rim Manai.</p>
                                <button className="btn-outline w-full py-4 text-[10px] font-black uppercase tracking-widest">Open Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
