'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import {
    Gauge, Zap, PhoneCall, CalendarClock,
    TrendingUp, CheckCircle2, CircleEllipsis,
} from "lucide-react";
import axios from "axios";
import ApiKeyManager from "@/components/Dashboard/ApiKeyManager";
import DailyCalls, { CustomTooltip } from "@/components/Dashboard/DailyCalls";
import SiteFooter from "@/components/basic/SiteFooter";
import SiteNavbar from "@/components/basic/SiteNavbar";

// ---------------- Types ----------------
interface DailyTrendItem {
    date: string;
    calls: number;
}

interface Comparison {
    status: "increased" | "decreased" | "same";
    today: number;
    yesterday: number;
}

interface DashboardData {
    username: string;
    plan: number;
    plan_limit: number;          // Monthly limit
    calls_today: number;
    calls_made_month: number;    // Used this month
    remaining_quota: number;     // Remaining this month
    quota_used_percent: number;  // % of monthly usage
    daily_trend: DailyTrendItem[];
    comparison_today_vs_yesterday: Comparison;
    average_daily_calls: number;
    last_day_reset: string;
    last_month_reset: string;
}

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    accent?: boolean;
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

interface ProgressRingProps {
    value: number;
    size?: number;
    stroke?: number;
}

// ---------------- Default Data ----------------
const defaultData: DashboardData = {
    username: "jyoti",
    plan: 0,
    plan_limit: 10,
    calls_today: 1,
    calls_made_month: 1,
    remaining_quota: 9,
    quota_used_percent: 10,
    daily_trend: [
        { date: "2025-08-15", calls: 0 },
        { date: "2025-08-16", calls: 0 },
        { date: "2025-08-17", calls: 0 },
        { date: "2025-08-18", calls: 0 },
        { date: "2025-08-19", calls: 0 },
        { date: "2025-08-20", calls: 0 },
        { date: "2025-08-21", calls: 1 },
    ],
    comparison_today_vs_yesterday: { status: "increased", today: 1, yesterday: 0 },
    average_daily_calls: 0.14,
    last_day_reset: "2025-08-21",
    last_month_reset: "2025-08-01",
};

// ---------------- Utils ----------------
function classNames(...c: (string | undefined | null | false)[]): string {
    return c.filter(Boolean).join(" ");
}

function formatShort(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "short", day: "2-digit" });
}



function ProgressRing({ value, size = 120, stroke = 10 }: ProgressRingProps) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} className="overflow-visible">
            {/* Gradient definition */}
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A3E635" /> {/* lime-300 */}
                    <stop offset="60%" stopColor="#2DD4BF" /> {/* teal-400 */}
                    <stop offset="100%" stopColor="#22D3EE" /> {/* cyan-400 */}
                </linearGradient>
            </defs>

            {/* Background circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb" // gray-200 background ring
                strokeWidth={stroke}
                fill="none"
            />

            {/* Progress circle with gradient */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#progressGradient)"
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1s ease" }}
            />

            {/* Text */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-gray-900 font-semibold text-xl"
            >
                {value}%
            </text>
        </svg>

    );
}


function StatCard({ title, value, subtitle, icon: Icon, accent = false }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-1 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] 
             bg-gradient-to-r from-lime-300/40 via-teal-400/40 to-cyan-400/40"
        >
            <div
                className={classNames(
                    "group relative flex items-center justify-between rounded-xl p-6",
                    accent ? "bg-gray-900 text-white" : "bg-white"
                )}
            >
                {/* Left content */}
                <div className="flex flex-col gap-1">
                    <p
                        className={classNames(
                            "text-xs uppercase tracking-wide font-semibold",
                            accent ? "text-gray-300" : "text-gray-500"
                        )}
                    >
                        {title}
                    </p>
                    <h3
                        className={classNames(
                            "text-3xl font-bold",
                            accent ? "text-white" : "text-gray-900"
                        )}
                    >
                        {value}
                    </h3>
                    {subtitle && (
                        <p
                            className={classNames(
                                "text-sm",
                                accent ? "text-gray-400" : "text-gray-500"
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Icon */}
                <div
                    className={classNames(
                        "flex items-center justify-center h-14 w-14 rounded-xl shadow-md transition-colors",
                        accent
                            ? "bg-gradient-to-br from-lime-400/30 via-teal-500/30 to-cyan-400/30 text-white"
                            : "bg-gradient-to-br from-lime-100 via-teal-100 to-cyan-100 text-indigo-600"
                    )}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </motion.div>



    );
}

function Section({ title, children, action }: SectionProps) {
    return (
        <div className="bg-gradient-to-r from-lime-300/40 via-teal-400/40 to-cyan-400/40 p-1 rounded-2xl shadow">
            <section className="rounded-2xl border border-black/5 bg-white p-5 h-full">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">{title}</h2>
                    {action}
                </div>
                {children}
            </section>
        </div>

    );
}

// ---------------- Dashboard ----------------
export default function UsageDashboard() {
    const [data, setData] = useState<DashboardData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get<DashboardData>("https://fasttools.neoversine.in/usage/dashboard", {
                    // withCredentials: false, // 🔑 important if cookies/sessions needed
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // if token-based
                    },
                });
                console.log(res.data)
                setData(res.data);
            } catch (err) {
                console.error("Error fetching dashboard:", err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-black">
                <span className="animate-pulse">Loading dashboard...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    // ✅ same dashboard code as before (just using `data` from API instead of props)
    if (!data) return null;
    const planName = data.plan === 0 ? "Free" : data.plan === 1 ? "Pro" : "Enterprise";
    const todayVsY = data.comparison_today_vs_yesterday;
    // const trend = data.daily_trend.map((d) => ({ ...d, label: formatShort(d.date) }));
    const usageLeftPercent = ((data.remaining_quota / data.plan_limit) * 100).toFixed(0);

    return (
        <div className="min-h-screen w-full bg-white text-black">
            {/* Top Bar */}
            <SiteNavbar />
            <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur mt-10">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-black bg-white">
                            <CircleEllipsis className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold leading-none">Usage Dashboard</h1>
                            <p className="text-xs text-black/60">Welcome back, {data.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/70">
                        <span className="rounded-full border border-black/10 bg-white px-3 py-1">Plan: {planName}</span>
                        <span className="max-md:hidden rounded-full border border-black/10 bg-white px-3 py-1">Limit: {data.plan_limit}/month</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-7xl px-4 py-6">

                <ApiKeyManager />

                <div className="w-full h-[1px] mb-4 bg-gradient-to-r from-gray-200 via-gray-700 to-gray-200"></div>
                {/* KPI Grid */}

                <h1 className="text-xl font-semibold mb-4">Your Usage:</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Calls Today"
                        value={data.calls_today}
                        subtitle={`Part of ${data.plan_limit}/month`}
                        icon={PhoneCall}
                    // accent
                    />
                    <StatCard
                        title="Remaining Quota"
                        value={data.remaining_quota}
                        subtitle={`${usageLeftPercent}% of monthly limit left`}
                        icon={Gauge}
                    />
                    <StatCard
                        title="Monthly Calls"
                        value={data.calls_made_month}
                        subtitle={`Avg/day ${data.average_daily_calls}`}
                        icon={Zap}
                    />
                    <StatCard
                        title="Today vs Yesterday"
                        value={`${todayVsY.today} vs ${todayVsY.yesterday}`}
                        subtitle={todayVsY.status === "increased" ? "Up today" : "Down today"}
                        icon={TrendingUp}
                    />
                </div>

                {/* Charts + Progress */}
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Section
                        title="Daily Calls (Last 7 Days)"
                        action={
                            <div className="flex items-center gap-2 text-xs text-black/60">
                                <CalendarClock className="h-4 w-4" />
                                <span>Resets monthly</span>
                            </div>
                        }
                    >
                        <DailyCalls data={data.daily_trend} />
                    </Section>


                    <Section title="Monthly Usage">
                        <div className="flex items-center gap-6">
                            <ProgressRing value={data.quota_used_percent} />
                            <div>
                                <p className="text-sm text-black/60">You&apos;ve used</p>
                                <p className="text-3xl font-bold">{data.calls_made_month} / {data.plan_limit}</p>
                                <p className="mt-2 text-sm text-black/60">{data.remaining_quota} remaining this month</p>
                                <div className="mt-4 flex items-center gap-2 text-xs text-black/70">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>Soft limit alerts enabled</span>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section title="Today vs Yesterday (Bars)">
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { label: "Yesterday", value: todayVsY.yesterday },
                                        { label: "Today", value: todayVsY.today },
                                    ]}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                                    <XAxis dataKey="label" tick={{ fill: "#000" }} axisLine={{ stroke: "#000" }} tickLine={{ stroke: "#000" }} />
                                    <YAxis allowDecimals={false} tick={{ fill: "#000" }} axisLine={{ stroke: "#000" }} tickLine={{ stroke: "#000" }} />
                                    <Tooltip cursor={{ fill: "rgba(96,165,250,0.2)", radius: 8 }} content={<CustomTooltip />}
                                    // contentStyle={{ background: "#fff", border: "1px solid #000", color: "#000" }} 
                                    />
                                    <Legend />
                                    <Bar dataKey="value" name="Calls" fill="#000000" radius={[8, 8, 0, 0]} activeBar={{ fill: "#60A5FA" }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Section>
                </div>

                {/* Resets + Meta */}
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Section title="Reset Information">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Last Day Reset</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{new Date(data.last_day_reset).toLocaleDateString()}</p>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Last Month Reset</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{new Date(data.last_month_reset).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Section>
                    <Section title="Plan Details">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Current Plan</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{planName}</p>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Monthly Limit</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{data.plan_limit}</p>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Used This Month</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{data.calls_made_month}</p>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-white p-4">
                                <p className="text-black/60">Remaining This Month</p>
                                <p className="mt-1 text-lg font-semibold text-gray-600">{data.remaining_quota}</p>
                            </div>
                        </div>
                    </Section>
                </div>


            </main>
        </div>
    );
}
