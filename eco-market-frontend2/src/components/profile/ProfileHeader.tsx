
import { Edit, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-dbs-blue/20 to-dbs-blue/10 flex items-center justify-center">
          <UserCircle className="h-16 w-16 text-dbs-blue" />
        </div>
        <Button
          size="icon"
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
        >
          <Edit className="h-4 w-4 text-white" />
        </Button>
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold animate-fade-in">Yazid Wiliadi</h2>
        <p className="text-muted-foreground">ID Cohort: FS065D5Y0110</p>
        <p className="text-sm text-muted-foreground mt-1">
          Member sejak 28 November 2006
        </p>
      </div>
      <div className="md:ml-auto">
        <Button className="hidden md:inline-flex" variant="default">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profil
        </Button>
      </div>
    </div>
  );
};
