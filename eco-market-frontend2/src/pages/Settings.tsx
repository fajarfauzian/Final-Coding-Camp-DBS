
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { ChevronRight, Save } from "lucide-react";
import { useState } from "react";

// Settings categories with their respective settings
const settingsData = [
  {
    id: "account",
    title: "Akun",
    settings: [
      { id: "name", title: "Nama Pengguna", value: "John Doe", type: "text" },
      { id: "email", title: "Email", value: "john.doe@example.com", type: "email" },
      { id: "phone", title: "Nomor Telepon", value: "+62 812 3456 7890", type: "tel" },
    ],
  },
  {
    id: "security",
    title: "Keamanan",
    settings: [
      { id: "password", title: "Kata Sandi", value: "••••••••", type: "password" },
      { id: "pin", title: "PIN Transaksi", value: "••••", type: "password" },
      { id: "two-factor", title: "Otentikasi Dua Faktor", value: true, type: "toggle" },
      { id: "login-notification", title: "Notifikasi Login Baru", value: true, type: "toggle" },
    ],
  },
  {
    id: "notifications",
    title: "Notifikasi",
    settings: [
      { id: "email-notifications", title: "Notifikasi Email", value: true, type: "toggle" },
      { id: "push-notifications", title: "Notifikasi Push", value: true, type: "toggle" },
      { id: "sms-notifications", title: "Notifikasi SMS", value: false, type: "toggle" },
      { id: "transaction-alerts", title: "Peringatan Transaksi", value: true, type: "toggle" },
      { id: "marketing-emails", title: "Email Pemasaran", value: false, type: "toggle" },
    ],
  },
  {
    id: "appearance",
    title: "Tampilan",
    settings: [
      { 
        id: "theme", 
        title: "Tema", 
        value: "light", 
        type: "select", 
        options: [
          { value: "light", label: "Terang" },
          { value: "dark", label: "Gelap" },
          { value: "system", label: "Sistem" },
        ]
      },
      { 
        id: "language", 
        title: "Bahasa", 
        value: "id", 
        type: "select", 
        options: [
          { value: "id", label: "Bahasa Indonesia" },
          { value: "en", label: "English" },
        ]
      },
      { 
        id: "currency", 
        title: "Mata Uang", 
        value: "idr", 
        type: "select", 
        options: [
          { value: "idr", label: "Rupiah (IDR)" },
          { value: "usd", label: "US Dollar (USD)" },
          { value: "sgd", label: "Singapore Dollar (SGD)" },
        ]
      },
    ],
  },
  {
    id: "privacy",
    title: "Privasi",
    settings: [
      { id: "data-sharing", title: "Berbagi Data", value: false, type: "toggle" },
      { id: "analytics", title: "Analitik Penggunaan", value: true, type: "toggle" },
      { id: "cookies", title: "Cookies Pihak Ketiga", value: false, type: "toggle" },
    ],
  },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("account");
  
  // Find the active category
  const activeCategoryData = settingsData.find(category => category.id === activeCategory);

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Pengaturan</h1>
          <p className="text-muted-foreground">Sesuaikan pengaturan akun Anda</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar / Category Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl p-4 card-shadow">
              <nav className="space-y-1">
                {settingsData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <span>{category.title}</span>
                    <ChevronRight className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      activeCategory === category.id && "transform rotate-90"
                    )} />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h2 className="text-xl font-bold mb-4">{activeCategoryData?.title}</h2>
              
              <div className="space-y-6">
                {activeCategoryData?.settings.map((setting) => (
                  <div key={setting.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-2 md:mb-0">
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {setting.type === "toggle" 
                            ? `${setting.value ? 'Aktif' : 'Tidak Aktif'}`
                            : setting.type === "select" 
                              ? setting.options?.find(opt => opt.value === setting.value)?.label 
                              : ''}
                        </p>
                      </div>
                      
                      <div>
                        {setting.type === "toggle" ? (
                          <div 
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            data-state={setting.value ? "checked" : "unchecked"}
                            role="switch"
                            aria-checked={setting.value ? "true" : "false"}
                            tabIndex={0}
                          >
                            <span 
                              className={cn(
                                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                                setting.value ? "translate-x-5" : "translate-x-0"
                              )} 
                            />
                          </div>
                        ) : setting.type === "select" ? (
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={setting.value}
                          >
                            {setting.options?.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            type={setting.type} 
                            value={setting.value} 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
