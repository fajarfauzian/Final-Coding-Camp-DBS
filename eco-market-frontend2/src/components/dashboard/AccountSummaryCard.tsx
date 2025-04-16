
import { ArrowDown, ArrowUp, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountSummaryCardProps {
  title: string;
  amount: string;
  type: "balance" | "income" | "expense";
  trend?: {
    percentage: string;
    isUp: boolean;
  };
  className?: string;
}

export function AccountSummaryCard({
  title,
  amount,
  type,
  trend,
  className,
}: AccountSummaryCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 card-shadow animate-fade-in card-shadow-hover",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">
            {amount}
          </h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <div
                className={cn(
                  "flex items-center text-xs",
                  trend.isUp ? "text-dbs-green" : "text-dbs-red"
                )}
              >
                {trend.isUp ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{trend.percentage}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-1">dari bulan lalu</span>
            </div>
          )}
        </div>

        <div className={cn(
          "p-3 rounded-full",
          type === "balance" && "bg-dbs-blue/10",
          type === "income" && "bg-dbs-green/10",
          type === "expense" && "bg-dbs-red/10",
        )}>
          {type === "balance" && <CreditCard className="h-5 w-5 text-dbs-blue" />}
          {type === "income" && <ArrowUp className="h-5 w-5 text-dbs-green" />}
          {type === "expense" && <ArrowDown className="h-5 w-5 text-dbs-red" />}
        </div>
      </div>
    </div>
  );
}
