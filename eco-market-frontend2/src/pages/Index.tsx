
import { Layout } from "@/components/Layout";
import { AccountSummaryCard } from "@/components/dashboard/AccountSummaryCard";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { TransactionList } from "@/components/dashboard/TransactionList";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Selamat Datang, Yazid!</h1>
          <p className="text-muted-foreground">Berikut ringkasan keuangan Anda hari ini</p>
        </div>
        
        {/* Account Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountSummaryCard
            title="Total Saldo"
            amount="Rp 25.750.000"
            type="balance"
            trend={{ percentage: "12%", isUp: true }}
          />
          <AccountSummaryCard
            title="Pemasukan Bulan Ini"
            amount="Rp 12.500.000"
            type="income"
            trend={{ percentage: "8%", isUp: true }}
          />
          <AccountSummaryCard
            title="Pengeluaran Bulan Ini"
            amount="Rp 7.250.000"
            type="expense"
            trend={{ percentage: "3%", isUp: false }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <IncomeExpenseChart />
        </div>
        
        {/* Transaction List */}
        <div>
          <TransactionList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
