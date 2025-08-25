import { CalendarClock } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export type CallData = {
    date: string;  // e.g. "2025-08-15"
    calls: number; // number of calls
};

// Type for formatted data (used in chart)
export type FormattedCallData = {
    label: string; // e.g. "Mon", "Tue"
    calls: number;
};

type DailyCallsProps = {
    data: CallData[];
};

type CustomTooltipPayload = {
    value: number;
    name: "calls";
    dataKey: "calls";
    payload: FormattedCallData;
    color: string;
};

interface CustomTooltipProps
    extends Omit<TooltipProps<number, string>, "payload" | "label"> {
    label?: string; // override with string
    payload?: CustomTooltipPayload[]; // strictly typed payload
}

// Custom tooltip component
export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="border-2 border-black/10 bg-white p-1 rounded-xl">
                <div
                    style={{
                        background: "linear-gradient(135deg, #3b82f630, #8b5cf630, #ec489940)",
                        // border: "1px solid #00000",
                        borderRadius: "7px",
                        padding: "8px 12px",
                    }}
                >
                    {/* Label (day) */}
                    <p style={{ color: "#000", fontWeight: 600 }}>{label}</p>

                    {/* Sub-data (calls) */}
                    <p style={{ color: "#555" }}>
                        Calls: {payload[0].value}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function DailyCalls({ data }: DailyCallsProps) {
    // Format data inside the component
    const formatted: FormattedCallData[] = data.map((d) => ({
        label: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
        calls: d.calls,
    }));
    return (
        <div className="flex h-64 w-full" >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatted}>
                    <XAxis dataKey="label" stroke="#aaa" />
                    {/* <YAxis allowDecimals={false} stroke="#aaa" /> */}
                    <Tooltip cursor={{ fill: "rgba(96,165,250,0.2)", radius: 8 }} content={<CustomTooltip />} />

                    <Bar dataKey="calls" fill="#E5E7EB" radius={[10, 10, 0, 0]} activeBar={{ fill: "#60A5FA" }} />
                </BarChart>
            </ResponsiveContainer>
        </div >
    );
}
