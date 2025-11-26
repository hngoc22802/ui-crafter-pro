import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Factory, Car, Pin, X, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WarningPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WarningPopup = ({ open, onOpenChange }: WarningPopupProps) => {
  const [isPinned, setIsPinned] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [transportType, setTransportType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isCommitted, setIsCommitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [tableTransportType, setTableTransportType] = useState("Xe tải (Truyền CCS)");

  const handleSave = () => {
    if (!isCommitted) {
      toast({
        title: "Vui lòng xác nhận cam kết",
        description: "Bạn cần tích vào ô cam kết trước khi lưu",
        variant: "destructive",
      });
      return;
    }
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] p-0 bg-background overflow-hidden">
        {/* Header */}
        <div className="bg-warning text-warning-foreground px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="font-bold text-lg">CẢNH BÁO</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="text-warning-foreground hover:opacity-80 transition-opacity"
            >
              <Pin className={`h-5 w-5 ${isPinned ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="text-warning-foreground hover:opacity-80 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Success Message Banner */}
        {showSuccessMessage && (
          <div className="bg-success text-success-foreground px-4 py-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Lưu thành công</span>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="truyen-c08" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
            <TabsTrigger 
              value="an-toan"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-warning data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
              <span className="flex items-center gap-2">
                An toàn
                <span className="bg-warning text-warning-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="truyen-c08"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-warning data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
              <span className="flex items-center gap-2">
                Truyền C08 BCA
                <span className="bg-warning text-warning-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="khac"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-warning data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
            >
              Khác
            </TabsTrigger>
          </TabsList>

          <TabsContent value="truyen-c08" className="p-6 space-y-6">
            {/* Warning Text */}
            <div className="text-warning font-medium">
              Dưới đây là danh sách thông tin khai báo thiếu, thông tin xe truyền Cục CSGT. Quý khách vui lòng kiểm tra và cập nhật để tránh bị xử phạt khi truyền dữ liệu lên Bộ Công an!
            </div>

            {/* Missing Information Section */}
            <div className="space-y-3">
              <h3 className="font-semibold">Danh sách thông tin khai báo thiếu [2]</h3>
              <p className="text-sm text-muted-foreground">Click vào ô đỏ để khai báo thông tin còn thiếu</p>
              
              <div className="flex gap-4">
                <Button 
                  variant="destructive"
                  className="h-20 flex-col gap-1 min-w-[180px]"
                >
                  <span className="text-2xl font-bold">2</span>
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    <span>Doanh nghiệp</span>
                  </div>
                </Button>
                
                <Button 
                  variant="default"
                  className="h-20 flex-col gap-1 min-w-[180px] bg-success hover:bg-success/90"
                >
                  <CheckCircle2 className="h-6 w-6" />
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span>Phương tiện</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Vehicle List Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Danh sách xe truyền Cục CSGT</h3>
              
              {/* Filters */}
              <div className="flex gap-4 items-center">
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn Loại phương tiện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xe-khach">Xe khách</SelectItem>
                    <SelectItem value="xe-tai">Xe tải</SelectItem>
                    <SelectItem value="xe-dien">Xe điện</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={transportType} onValueChange={setTransportType}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Chọn Loại hình vận tải" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truyen-ccs">Xe tải (Truyền CCS)</SelectItem>
                    <SelectItem value="khong-truyen">Xe tải (Không truyền CCS)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={licensePlate} onValueChange={setLicensePlate}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn Biển kiểm soát" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00A17795">00A17795</SelectItem>
                    <SelectItem value="00C-54092">00C-54092</SelectItem>
                    <SelectItem value="00C10000">00C10000</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="default" size="icon" className="shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Data Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-warning text-warning-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">STT</th>
                      <th className="px-4 py-3 text-left font-semibold">Biển kiểm soát</th>
                      <th className="px-4 py-3 text-left font-semibold">Loại hình vận tải</th>
                      <th className="px-4 py-3 text-left font-semibold">Ngày tạo phương tiện</th>
                      <th className="px-4 py-3 text-left font-semibold">Ngày cập nhật</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">
                        <button 
                          className="text-primary hover:underline font-medium"
                          onClick={() => toast({ title: "Chuyển đến tab Sửa phương tiện" })}
                        >
                          00A17795
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <Select value={tableTransportType} onValueChange={setTableTransportType}>
                          <SelectTrigger className="w-[200px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Xe tải (Truyền CCS)">Xe tải (Truyền CCS)</SelectItem>
                            <SelectItem value="Xe tải (Không truyền CCS)">Xe tải (Không truyền CCS)</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3 text-sm">03/05/2024 16:50:23</td>
                      <td className="px-4 py-3 text-sm">06/07/2025 09:45:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{'<'}</span>
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">1</span>
                  <span>{'>'}</span>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>dòng mỗi trang</span>
                </div>
              </div>

              {/* Commitment Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Checkbox 
                  id="commitment"
                  checked={isCommitted}
                  onCheckedChange={(checked) => setIsCommitted(checked as boolean)}
                  className="mt-1"
                />
                <label 
                  htmlFor="commitment" 
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  Tôi cam kết các thông tin khai báo là chính xác. Nếu có sai lệch, tôi hoàn toàn chịu trách nhiệm với BCA.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="destructive"
                  onClick={handleSave}
                  className="min-w-[100px]"
                >
                  Lưu
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="min-w-[100px]"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="an-toan" className="p-6">
            <p className="text-muted-foreground">Nội dung tab An toàn</p>
          </TabsContent>

          <TabsContent value="khac" className="p-6">
            <p className="text-muted-foreground">Nội dung tab Khác</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
