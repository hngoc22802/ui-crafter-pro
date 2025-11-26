import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WarningPopup } from "@/components/WarningPopup";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Hệ thống Quản lý Phương tiện
        </h1>
        <p className="text-xl text-muted-foreground">
          Hệ thống khai báo và quản lý thông tin phương tiện vận tải
        </p>
        <Button 
          onClick={() => setShowPopup(true)}
          variant="destructive"
          size="lg"
          className="mt-8"
        >
          Mở cảnh báo
        </Button>
      </div>

      <WarningPopup open={showPopup} onOpenChange={setShowPopup} />
    </div>
  );
};

export default Index;
