
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown, Download, PieChart } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart as ReChartsPieChart,
  Legend 
} from "recharts";

// Import data from our mock data file
import { 
  incomeExpenseChartData, 
  expenseCategoriesData, 
  savingsData, 
  formatCurrency 
} from "@/data/mockData";

// Use the imported data
const monthlyData = incomeExpenseChartData;
const expenseCategories = expenseCategoriesData;

const ReportsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Laporan Keuangan</h1>
          <p className="text-muted-foreground">Analisis dan tinjauan keuangan Anda</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
              <span>Bulanan</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            <button className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Januari - Juni 2024</span>
            </button>
          </div>
          <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            <span>Unduh Laporan</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
            <h3 className="text-sm font-medium text-muted-foreground">Total Pemasukan</h3>
            <p className="text-3xl font-bold mt-2">Rp 79.550.000</p>
            <div className="flex items-center mt-1 text-dbs-green text-sm">
              <span>+5.2% dari periode sebelumnya</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
            <h3 className="text-sm font-medium text-muted-foreground">Total Pengeluaran</h3>
            <p className="text-3xl font-bold mt-2">Rp 45.950.000</p>
            <div className="flex items-center mt-1 text-dbs-red text-sm">
              <span>+3.8% dari periode sebelumnya</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
            <h3 className="text-sm font-medium text-muted-foreground">Tabungan</h3>
            <p className="text-3xl font-bold mt-2">Rp 16.500.000</p>
            <div className="flex items-center mt-1 text-dbs-blue text-sm">
              <span>62.5% dari target</span>
            </div>
          </div>
        </div>

        {/* Income vs Expense Chart */}
        <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Pendapatan vs Pengeluaran</h3>
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-dbs-blue mr-2"></div>
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
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
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
                  tickFormatter={(value) => `${value/1000000}jt`} 
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Bulan ${label}`}
                />
                <Bar 
                  dataKey="income" 
                  name="Pemasukan" 
                  fill="#0075c4" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                />
                <Bar 
                  dataKey="expense" 
                  name="Pengeluaran" 
                  fill="#e63946" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Categories */}
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Kategori Pengeluaran</h3>
              <button className="text-xs text-dbs-blue font-medium hover:underline flex items-center">
                <PieChart className="h-3 w-3 mr-1" />
                Detail
              </button>
            </div>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <ReChartsPieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </ReChartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Savings Trend */}
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Tren Tabungan</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={savingsData}
                  margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
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
                    tickFormatter={(value) => `${value/1000000}jt`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Bulan ${label}`}
                  />
                  <Bar 
                    dataKey="amount" 
                    name="Tabungan" 
                    fill="#00a067" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
