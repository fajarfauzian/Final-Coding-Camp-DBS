
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  TooltipProps 
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { incomeExpenseChartData, formatCurrency } from "@/data/mockData";

// Use data from our mock data file
const data = incomeExpenseChartData;

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-sm font-bold"
            style={{ color: entry.color }}
          >
            {entry.name}: {formatCurrency(Number(entry.value))}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function IncomeExpenseChart() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in h-full card-shadow-hover">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Pemasukan vs Pengeluaran</h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-dbs-green mr-2"></div>
            <span className="text-xs text-muted-foreground">Pemasukan</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-dbs-red mr-2"></div>
            <span className="text-xs text-muted-foreground">Pengeluaran</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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
            <Bar 
              dataKey="income" 
              name="Pemasukan" 
              fill="#00a067" 
              radius={[4, 4, 0, 0]} 
              barSize={20} 
            />
            <Bar 
              dataKey="expense" 
              name="Pengeluaran" 
              fill="#e63946" 
              radius={[4, 4, 0, 0]} 
              barSize={20} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
