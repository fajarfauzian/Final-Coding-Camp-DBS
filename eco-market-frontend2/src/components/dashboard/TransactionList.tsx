
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, ShoppingCart, Smartphone, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { recentTransactions, Transaction as TransactionType } from "@/data/mockData";

// Convert the transactions data to include icons
const transactions: TransactionType[] = recentTransactions.map(transaction => {
  let icon;
  
  if (transaction.type === "income") {
    if (transaction.category === "Gaji") {
      icon = <CircleDollarSign className="h-4 w-4 text-dbs-green" />;
    } else {
      icon = <ArrowDownLeft className="h-4 w-4 text-dbs-green" />;
    }
  } else {
    if (transaction.category === "Belanja") {
      icon = <ShoppingCart className="h-4 w-4 text-dbs-red" />;
    } else if (transaction.category === "Utilitas") {
      icon = <Zap className="h-4 w-4 text-dbs-red" />;
    } else if (transaction.category === "Telekomunikasi") {
      icon = <Smartphone className="h-4 w-4 text-dbs-red" />;
    } else {
      icon = <ArrowUpRight className="h-4 w-4 text-dbs-red" />;
    }
  }
  
  return {...transaction, icon};
});

export function TransactionList() {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Transaksi Terbaru</h3>
        <button className="text-dbs-blue text-sm font-medium hover:underline">
          Lihat Semua
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                transaction.type === "income" ? "bg-dbs-green/10" : "bg-dbs-red/10"
              )}>
                {transaction.icon || (
                  transaction.type === "income" ? (
                    <ArrowDownLeft className="h-5 w-5 text-dbs-green" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-dbs-red" />
                  )
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <div>
              <p className={cn(
                "font-medium text-sm",
                transaction.type === "income" ? "text-dbs-green" : "text-dbs-red"
              )}>
                {transaction.type === "income" ? "+" : "-"}{transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
