
import { Layout } from "@/components/Layout";
import { PiggyBank, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SavingsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Tabungan</h1>
            <p className="text-muted-foreground">Lihat rencana dan target tabungan Anda</p>
          </div>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Target Baru
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Savings Target Card */}
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-dbs-green/10 flex items-center justify-center">
                  <PiggyBank className="h-6 w-6 text-dbs-green" />
                </div>
                <div>
                  <h3 className="font-medium">Dana Darurat</h3>
                  <p className="text-sm text-muted-foreground">Target: Rp 50.000.000</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-dbs-green h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-sm font-medium">45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsPage;
