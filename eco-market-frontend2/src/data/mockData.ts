
// Transaction Types
export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: string;
  amountValue: number;
  type: "income" | "expense";
  status: "completed" | "pending" | "failed";
  icon?: React.ReactNode;
};

// Chart data types
export type BalanceData = {
  name: string;
  balance: number;
};

export type IncomeExpenseData = {
  name: string;
  income: number;
  expense: number;
};

export type ExpenseCategoryData = {
  name: string;
  value: number;
  color: string;
};

export type SavingsData = {
  name: string;
  amount: number;
};

// Mock transactions data
export const recentTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "Hari ini, 14:30",
    description: "Transfer dari Bank XYZ",
    category: "Deposit",
    amount: "Rp 2.500.000",
    amountValue: 2500000,
    type: "income",
    status: "completed",
  },
  {
    id: "tx2",
    date: "Hari ini, 11:20",
    description: "Supermarket ABC",
    category: "Belanja",
    amount: "Rp 350.000",
    amountValue: 350000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx3",
    date: "Kemarin, 19:45",
    description: "Pembayaran Listrik",
    category: "Utilitas",
    amount: "Rp 520.000",
    amountValue: 520000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx4",
    date: "Kemarin, 15:10",
    description: "Pembayaran Internet",
    category: "Telekomunikasi",
    amount: "Rp 420.000",
    amountValue: 420000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx5",
    date: "25 Apr, 09:15",
    description: "Pembayaran Gaji Bulanan",
    category: "Gaji",
    amount: "Rp 8.500.000",
    amountValue: 8500000,
    type: "income",
    status: "completed",
  },
];

// More detailed transactions for the transactions page
export const allTransactions: Transaction[] = [
  ...recentTransactions,
  {
    id: "tx6",
    date: "24 Apr 2024",
    description: "Pembayaran Netflix",
    category: "Hiburan",
    amount: "Rp 186.000",
    amountValue: 186000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx7",
    date: "23 Apr 2024",
    description: "Makan Siang Restoran XYZ",
    category: "Makanan",
    amount: "Rp 120.000",
    amountValue: 120000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx8",
    date: "22 Apr 2024",
    description: "Transfer ke Jane Doe",
    category: "Transfer",
    amount: "Rp 500.000",
    amountValue: 500000,
    type: "expense",
    status: "completed",
  },
  {
    id: "tx9",
    date: "21 Apr 2024",
    description: "Pembayaran Tiket Kereta",
    category: "Transportasi",
    amount: "Rp 350.000",
    amountValue: 350000,
    type: "expense",
    status: "pending",
  },
  {
    id: "tx10",
    date: "20 Apr 2024",
    description: "Pembayaran Sewa Kantor",
    category: "Bisnis",
    amount: "Rp 3.500.000",
    amountValue: 3500000,
    type: "expense",
    status: "failed",
  },
];

// Balance chart data
export const balanceChartData: BalanceData[] = [
  { name: "Jan", balance: 4000000 },
  { name: "Feb", balance: 4500000 },
  { name: "Mar", balance: 4200000 },
  { name: "Apr", balance: 5500000 },
  { name: "May", balance: 5200000 },
  { name: "Jun", balance: 6000000 },
  { name: "Jul", balance: 7000000 },
  { name: "Aug", balance: 8500000 },
  { name: "Sep", balance: 8200000 },
  { name: "Oct", balance: 9000000 },
  { name: "Nov", balance: 9800000 },
  { name: "Dec", balance: 10500000 },
];

// Income vs expense chart data
export const incomeExpenseChartData: IncomeExpenseData[] = [
  { name: "Jan", income: 12500000, expense: 7250000 },
  { name: "Feb", income: 13000000, expense: 7500000 },
  { name: "Mar", income: 12750000, expense: 7800000 },
  { name: "Apr", income: 13500000, expense: 7400000 },
  { name: "May", income: 14000000, expense: 7900000 },
  { name: "Jun", income: 13800000, expense: 8100000 },
];

// Expense categories data for pie chart
export const expenseCategoriesData: ExpenseCategoryData[] = [
  { name: "Belanja", value: 2500000, color: "#0075c4" },
  { name: "Utilitas", value: 1200000, color: "#00a067" },
  { name: "Transportasi", value: 950000, color: "#f4a261" },
  { name: "Makanan", value: 1800000, color: "#e63946" },
  { name: "Hiburan", value: 750000, color: "#ffca3a" },
];

// Savings data
export const savingsData: SavingsData[] = [
  { name: "Jan", amount: 2000000 },
  { name: "Feb", amount: 2500000 },
  { name: "Mar", amount: 2250000 },
  { name: "Apr", amount: 3000000 },
  { name: "May", amount: 3500000 },
  { name: "Jun", amount: 3250000 },
];

// Format currency utility
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
