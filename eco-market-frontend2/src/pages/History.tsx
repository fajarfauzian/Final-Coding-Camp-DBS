
import { Layout } from "@/components/Layout";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const HistoryPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">Lihat seluruh riwayat transaksi Anda</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="pl-10 pr-4 py-2 rounded-lg border border-input w-full"
            />
          </div>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Filter Tanggal
          </Button>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="space-y-6">
            {/* Example Transaction */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Transfer ke John Doe</p>
                  <p className="text-sm text-muted-foreground">20 Apr 2024, 14:30</p>
                </div>
              </div>
              <p className="text-dbs-red font-medium">- Rp 500.000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
