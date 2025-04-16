
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps 
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { balanceChartData, formatCurrency } from "@/data/mockData";

// Use the data from our mock data file
const data = balanceChartData;

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-sm font-bold text-dbs-blue">
          {formatCurrency(Number(payload[0].value))}
        </p>
      </div>
    );
  }
  return null;
};

export function BalanceChart() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in h-full card-shadow-hover">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Tren Saldo</h3>
        <div className="flex gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-dbs-blue mr-2"></div>
            <span className="text-xs text-muted-foreground">Saldo</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0075c4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0075c4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `Rp ${value/1000}k`} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#0075c4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
