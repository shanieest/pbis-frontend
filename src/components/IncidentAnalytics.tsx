import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface IncidentData {
    week: string;
    total: number;
    minor: number;
    severe: number;
}

const data: IncidentData[] = [
    { week: "Week 1", total: 45, minor: 30, severe: 15 },
    { week: "Week 2", total: 52, minor: 35, severe: 17 },
    { week: "Week 3", total: 48, minor: 32, severe: 16 },
    { week: "Week 4", total: 61, minor: 40, severe: 21 },
    { week: "Week 5", total: 55, minor: 36, severe: 19 },
    { week: "Week 6", total: 58, minor: 38, severe: 20 },
    { week: "Week 7", total: 64, minor: 42, severe: 22 },
    { week: "Week 8", total: 59, minor: 39, severe: 20 },
];

export default function IncidentAnalytics() {
    const totalIncidents = data.reduce((sum, d) => sum + d.total, 0);
    const totalMinor = data.reduce((sum, d) => sum + d.minor, 0);
    const totalSevere = data.reduce((sum, d) => sum + d.severe, 0);

    const avgTotal = (totalIncidents / data.length).toFixed(1);
    const avgMinor = (totalMinor / data.length).toFixed(1);
    const avgSevere = (totalSevere / data.length).toFixed(1);

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
                    <p className="text-gray-600 text-sm font-medium">Total Incidents</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{totalIncidents}</p>
                    <p className="text-gray-500 text-xs mt-2">Avg: {avgTotal}/week</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-yellow-50 to-yellow-100">
                    <p className="text-gray-600 text-sm font-medium">Minor Incidents</p>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{totalMinor}</p>
                    <p className="text-gray-500 text-xs mt-2">Avg: {avgMinor}/week</p>
                </div>

                    <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-red-50 to-red-100">
                    <p className="text-gray-600 text-sm font-medium">Severe/Moderate</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{totalSevere}</p>
                    <p className="text-gray-500 text-xs mt-2">Avg: {avgSevere}/week</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Incident Trends</h2>
                <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                    dataKey="week"
                    stroke="#666"
                    style={{ fontSize: "14px" }}
                    />
                    <YAxis stroke="#666" style={{ fontSize: "14px" }} />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                    formatter={(value) => Number(value).toString()}
                    />
                    <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="line"
                    />
                    <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Total Incidents"
                    />
                    <Line
                    type="monotone"
                    dataKey="minor"
                    stroke="#eab308"
                    strokeWidth={2}
                    dot={{ fill: "#eab308", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Minor Incidents"
                    />
                    <Line
                    type="monotone"
                    dataKey="severe"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={{ fill: "#dc2626", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Severe/Moderate"
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
