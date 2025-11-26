import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search, Plus, FileDown, Printer, Info, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CompanyExcelImportPopup } from "./CompanyExcelImportPopup";
import { VehicleExcelImportPopup } from "./VehicleExcelImportPopup";

interface CompanyDataPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "company" | "vehicle";
  defaultTab?: "company" | "vehicle";
}

export const CompanyDataPopup = ({ open, onOpenChange, type, defaultTab = "company" }: CompanyDataPopupProps) => {
  const [activeTab, setActiveTab] = useState<"company" | "vehicle">(defaultTab);
  const [company, setCompany] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [transportType, setTransportType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [status, setStatus] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showQuickAddPopup, setShowQuickAddPopup] = useState(false);
  const [showEditCompanyPopup, setShowEditCompanyPopup] = useState(false);
  const [showEditVehiclePopup, setShowEditVehiclePopup] = useState(false);
  const [showCompanyExcelImport, setShowCompanyExcelImport] = useState(false);
  const [showVehicleExcelImport, setShowVehicleExcelImport] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  const handleSave = () => {
    toast({
      title: "Lưu thành công",
      description: "Dữ liệu đã được cập nhật",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[1100px] p-0 bg-background overflow-hidden">
          {/* Header */}
          <div className="bg-warning text-warning-foreground px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-warning-foreground text-warning rounded-full w-8 h-8 flex items-center justify-center font-bold">
                +
              </div>
              <h2 className="font-bold text-lg">CUNG CẤP DỮ LIỆU TRUYỀN C08 BỘ CÔNG AN</h2>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-warning-foreground hover:opacity-80 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab("company")}
              className={`px-6 py-3 font-semibold ${
                activeTab === "company" 
                  ? "bg-warning text-warning-foreground" 
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              1. Thông tin doanh nghiệp
            </button>
            <button 
              onClick={() => setActiveTab("vehicle")}
              className={`px-6 py-3 font-semibold ${
                activeTab === "vehicle" 
                  ? "bg-warning text-warning-foreground" 
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              2. Thông tin phương tiện
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {activeTab === "company" ? (
              <>
                {/* Warning Message */}
                <div className="bg-warning/10 border border-warning/30 rounded p-4 text-sm space-y-2">
                  <p className="text-foreground">
                    Từ ngày 1/1/2025, Bộ Công An (BCA) yêu cầu dữ liệu truyền về máy chủ của Cục Cảnh sát giao thông (CSGT) bao gồm: dữ liệu định danh, dữ liệu hành trình và dữ liệu hình ảnh người lái xe. Thông tin định danh của đơn vị vận tải bao gồm:
                  </p>
                  <div className="space-y-1 ml-4">
                    <p><span className="font-semibold text-warning">1. Thông tin doanh nghiệp:</span> Tên đơn vị KDVT, Mã số thuế, Số điện thoại</p>
                    <p><span className="font-semibold text-warning">2. Thông tin phương tiện:</span> BKS, Đơn vị KDVT, Loại hình vận tải, Số người chuyển chở/Tải trọng xe, Số khung</p>
                  </div>
                  <p className="text-foreground">
                    Để đảm bảo truyền đúng quy định, Quý khách vui lòng cập nhật đầy đủ thông tin, BA GPS sẽ truyền dữ liệu về Cục CSGT dựa trên thông tin mà Quý khách khai báo.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center">
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger className={`w-[250px] ${!company ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Công ty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viettel-telecom">Viettel Telecom</SelectItem>
                      <SelectItem value="viettel-tuyen-quang">Viettel Tuyên Quang</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className={`w-[250px] ${!status ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Trạng thái khai báo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tat-ca">Tất cả</SelectItem>
                      <SelectItem value="thieu-thong-tin">Thiếu thông tin</SelectItem>
                      <SelectItem value="du-thong-tin">Đủ thông tin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm công ty
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setShowCompanyExcelImport(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm nhanh bằng Excel
                    </Button>
                  </div>
                  
                  {/* Export and Print Buttons */}
                  <div className="flex gap-3">
                    <div className="relative">
                      <Button 
                        className="bg-warning hover:bg-warning/90 text-warning-foreground"
                        onClick={() => setShowExportMenu(!showExportMenu)}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Xuất file
                      </Button>
                      {showExportMenu && (
                        <div className="absolute top-full right-0 mt-1 bg-background border rounded-md shadow-lg z-50 min-w-[120px]">
                          <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors">
                            Excel
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors">
                            PDF
                          </button>
                        </div>
                      )}
                    </div>
                    <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                      <Printer className="h-4 w-4 mr-2" />
                      In
                    </Button>
                  </div>
                </div>

                {/* Data Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-warning text-warning-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold w-16">STT</th>
                        <th className="px-4 py-3 text-left font-semibold w-64">Tên công ty (*)</th>
                        <th className="px-4 py-3 text-left font-semibold w-40">
                          Mã số thuế (*)
                          <span className="text-yellow-300 ml-1">⚠</span>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold w-40">
                          Số điện thoại (*)
                          <span className="text-yellow-300 ml-1">⚠</span>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold w-48">Địa chỉ</th>
                        <th className="px-4 py-3 text-left font-semibold w-20">Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-muted/50">
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">Viettel Tuyên Quang</td>
                        <td className="px-4 py-3 bg-warning/20"></td>
                        <td className="px-4 py-3 bg-warning/20"></td>
                        <td className="px-4 py-3">Tuyên Quang</td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => setShowEditCompanyPopup(true)}
                            className="text-primary hover:opacity-80"
                          >
                            <Info className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <button className="hover:text-foreground">{'<'}</button>
                    <button className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">1</button>
                    <button className="hover:text-foreground">2</button>
                    <button className="hover:text-foreground">{'>'}</button>
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
                    <button className="text-warning hover:opacity-80 ml-4">
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Vehicle Tab Warning Message */}
                <div className="bg-warning/10 border border-warning/30 rounded p-4 text-sm space-y-2">
                  <p className="text-foreground">
                    Từ ngày 1/1/2025, Bộ Công An (BCA) yêu cầu dữ liệu truyền về máy chủ của Cục Cảnh sát giao thông (CSGT) bao gồm: dữ liệu định danh, dữ liệu hành trình và dữ liệu hình ảnh người lái xe. Thông tin định danh của đơn vị vận tải bao gồm:
                  </p>
                  <div className="space-y-1 ml-4">
                    <p><span className="font-semibold text-warning">1. Thông tin doanh nghiệp:</span> Tên đơn vị KDVT, Mã số thuế, Số điện thoại</p>
                    <p><span className="font-semibold text-warning">2. Thông tin phương tiện:</span> BKS, Đơn vị KDVT, Loại hình vận tải, Số người chuyển chở/Tải trọng xe, Số khung</p>
                  </div>
                  <p className="text-foreground">
                    Để đảm bảo truyền đúng quy định, Quý khách vui lòng cập nhật đầy đủ thông tin, BA GPS sẽ truyền dữ liệu về Cục CSGT dựa trên thông tin mà Quý khách khai báo.
                  </p>
                </div>

                {/* Vehicle Filters */}
                <div className="flex gap-4 items-center flex-wrap">
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger className={`w-[200px] ${!company ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Công ty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viettel-telecom">Viettel Telecom</SelectItem>
                      <SelectItem value="viettel-tuyen-quang">Viettel Tuyên Quang</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger className={`w-[200px] ${!vehicleType ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Loại phương tiện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xe-tai">Xe tải</SelectItem>
                      <SelectItem value="xe-con">Xe con</SelectItem>
                      <SelectItem value="xe-khach">Xe khách</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={transportType} onValueChange={setTransportType}>
                    <SelectTrigger className={`w-[230px] ${!transportType ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Loại hình vận tải" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truyen-ccs">Xe tải (Truyền CCS)</SelectItem>
                      <SelectItem value="khong-truyen">Xe tải (Không truyền CCS)</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={licensePlate} onValueChange={setLicensePlate}>
                    <SelectTrigger className={`w-[180px] ${!licensePlate ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Biển kiểm soát" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00A17795">00A17795</SelectItem>
                      <SelectItem value="00B16543">00B16543</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className={`w-[220px] ${!status ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder="Chọn Trạng thái khai báo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tat-ca">Tất cả</SelectItem>
                      <SelectItem value="thieu-thong-tin">Thiếu thông tin</SelectItem>
                      <SelectItem value="du-thong-tin">Đủ thông tin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                  </Button>
                </div>

                {/* Vehicle Action Buttons */}
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm phương tiện
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setShowVehicleExcelImport(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm nhanh bằng Excel
                    </Button>
                  </div>
                  
                  {/* Export and Print Buttons */}
                  <div className="flex gap-3">
                    <div className="relative">
                      <Button 
                        className="bg-warning hover:bg-warning/90 text-warning-foreground"
                        onClick={() => setShowExportMenu(!showExportMenu)}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Xuất file
                      </Button>
                      {showExportMenu && (
                        <div className="absolute top-full right-0 mt-1 bg-background border rounded-md shadow-lg z-50 min-w-[120px]">
                          <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors">
                            Excel
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors">
                            PDF
                          </button>
                        </div>
                      )}
                    </div>
                    <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                      <Printer className="h-4 w-4 mr-2" />
                      In
                    </Button>
                  </div>
                </div>

                {/* Vehicle Data Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-warning text-warning-foreground">
                      <tr>
                        <th className="px-3 py-3 text-left font-semibold w-12">STT</th>
                        <th className="px-3 py-3 text-left font-semibold w-28">BKS (*)</th>
                        <th className="px-3 py-3 text-left font-semibold w-44">
                          Loại hình vận tải (*)
                          <span className="text-yellow-300 ml-1">⚠</span>
                        </th>
                        <th className="px-3 py-3 text-left font-semibold w-36">Tên công ty</th>
                        <th className="px-3 py-3 text-left font-semibold w-32">
                          Số người chuyển chở (*)
                          <span className="text-yellow-300 ml-1">⚠</span>
                        </th>
                        <th className="px-3 py-3 text-left font-semibold w-32">
                          Tải trọng xe (tấn) (*)
                          <span className="text-yellow-300 ml-1">⚠</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-muted/50">
                        <td className="px-3 py-3">1</td>
                        <td className="px-3 py-3">
                          <button 
                            onClick={() => setShowEditVehiclePopup(true)}
                            className="text-[#0066CC] hover:underline font-medium"
                          >
                            00A17795
                          </button>
                        </td>
                        <td className="px-3 py-3 bg-warning/20">
                          <input type="text" className="w-full bg-transparent border-none outline-none" placeholder="Xe tải (Truyền CCS)" />
                        </td>
                        <td className="px-3 py-3">Viettel Telecom</td>
                        <td className="px-3 py-3 bg-warning/20">
                          <input type="number" className="w-full bg-transparent border-none outline-none" placeholder="20" />
                        </td>
                        <td className="px-3 py-3 bg-warning/20">
                          <input type="number" className="w-full bg-transparent border-none outline-none" placeholder="5" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <button className="hover:text-foreground">{'<'}</button>
                    <button className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">1</button>
                    <button className="hover:text-foreground">3</button>
                    <button className="hover:text-foreground">{'>'}</button>
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
                    <button className="text-warning hover:opacity-80 ml-4">
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-4">
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
        </DialogContent>
      </Dialog>

      {/* Quick Add Popup */}
      {/* Vehicle Excel Import Popup */}
      <CompanyExcelImportPopup 
        open={showCompanyExcelImport} 
        onOpenChange={setShowCompanyExcelImport}
      />

      {/* Edit Company Popup */}
      <Dialog open={showEditCompanyPopup} onOpenChange={setShowEditCompanyPopup}>
        <DialogContent className="max-w-[600px]">
          <div className="bg-warning text-warning-foreground px-4 py-3 -mx-6 -mt-6 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">SỬA CÔNG TY</h2>
            <button onClick={() => setShowEditCompanyPopup(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-muted-foreground">Nội dung sửa công ty...</p>
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Popup */}
      <Dialog open={showEditVehiclePopup} onOpenChange={setShowEditVehiclePopup}>
        <DialogContent className="max-w-[600px]">
          <div className="bg-warning text-warning-foreground px-4 py-3 -mx-6 -mt-6 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">SỬA PHƯƠNG TIỆN</h2>
            <button onClick={() => setShowEditVehiclePopup(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-muted-foreground">Nội dung sửa phương tiện...</p>
        </DialogContent>
      </Dialog>

      {/* Vehicle Excel Import Popup */}
      <VehicleExcelImportPopup 
        open={showVehicleExcelImport} 
        onOpenChange={setShowVehicleExcelImport}
      />
    </>
  );
};
