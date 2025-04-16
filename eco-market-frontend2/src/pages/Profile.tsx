
import { Layout } from "@/components/Layout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const ProfilePage = () => {
  const handleSave = () => {
    toast.success("Profil berhasil diperbarui");
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Profil Pengguna</h1>
          <p className="text-muted-foreground">Kelola informasi profil Anda</p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in">
          <ProfileHeader />
          <Button className="w-full md:hidden mt-4">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profil
          </Button>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 card-shadow animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Informasi Pribadi</h3>
            <Button
              variant="link"
              className="text-dbs-blue font-medium hover:underline"
              onClick={handleSave}
            >
              Simpan
            </Button>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
