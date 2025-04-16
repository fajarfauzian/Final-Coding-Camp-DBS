
import { Layout } from "@/components/Layout";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Akun Saya</h1>
            <p className="text-muted-foreground">Kelola semua akun bank Anda</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Akun
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Card */}
          <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-dbs-blue/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-dbs-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Tabungan Ultimate</h3>
                  <p className="text-sm text-muted-foreground">**** 1234</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className="text-2xl font-bold">Rp 12.500.000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountsPage;
