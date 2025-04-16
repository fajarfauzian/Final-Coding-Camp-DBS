
import { Layout } from "@/components/Layout";
import { Calendar, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { allTransactions } from "@/data/mockData";

// Use the transactions data from our mock data file
const transactions = allTransactions;

const TransactionsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Transaksi</h1>
          <p className="text-muted-foreground">Semua transaksi keuangan Anda</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="pl-10 pr-4 py-2 rounded-lg border border-input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Tanggal</span>
            </button>
            <button className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Tanggal</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Deskripsi</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Kategori</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Jumlah</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/20">
                    <td className="p-4 text-sm">{transaction.date}</td>
                    <td className="p-4 text-sm font-medium">{transaction.description}</td>
                    <td className="p-4 text-sm">{transaction.category}</td>
                    <td className={cn(
                      "p-4 text-sm font-medium",
                      transaction.type === "income" ? "text-dbs-green" : "text-dbs-red"
                    )}>
                      {transaction.type === "income" ? "+" : "-"}{transaction.amount}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={cn(
                        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        transaction.status === "completed" && "bg-dbs-green/10 text-dbs-green",
                        transaction.status === "pending" && "bg-dbs-orange/10 text-dbs-orange",
                        transaction.status === "failed" && "bg-dbs-red/10 text-dbs-red"
                      )}>
                        {transaction.status === "completed" ? "Berhasil" : 
                         transaction.status === "pending" ? "Proses" : "Gagal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Menampilkan 1-10 dari 50 transaksi</p>
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
                Sebelumnya
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
