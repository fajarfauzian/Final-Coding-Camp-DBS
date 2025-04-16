
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileInfo = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">wiliadiyaziiid@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">Nomor Telepon</p>
            <p className="font-medium">+62 812 9510 9399</p>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
        <div>
          <p className="text-sm text-muted-foreground">Alamat</p>
          <p className="font-medium">
            Jl. Raya Puncak Rt3/1 Tugu Utara Cisarua Bogor
          </p>
        </div>
      </div>
    </div>
  );
};
