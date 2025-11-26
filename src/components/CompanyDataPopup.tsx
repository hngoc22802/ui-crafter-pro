import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search, Plus, FileDown, Printer, Info, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CompanyDataPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "company" | "vehicle";
}

export const CompanyDataPopup = ({ open, onOpenChange, type }: CompanyDataPopupProps) => {
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showQuickAddPopup, setShowQuickAddPopup] = useState(false);
  const [showEditCompanyPopup, setShowEditCompanyPopup] = useState(false);

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
            <button className="bg-warning text-warning-foreground px-6 py-3 font-semibold">
              1. Thông tin doanh nghiệp
            </button>
            <button className="bg-muted/30 px-6 py-3">2. Thông tin phương tiện</button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Warning Message */}
            <div className="bg-warning/10 border border-warning/30 rounded p-4 text-sm space-y-2">
              <p className="text-foreground">
                Từ ngày 1/1/2025, Bộ Công An (BCA) yêu cầu dữ liệu truyền về máy chủ của Cục Cảnh sát giao thông (CSGT) bao gồm: dữ liệu định danh, dữ liệu hành trình và dữ liệu hình ảnh người lái xe. Thông tin định danh của đơn vị vận tải bao gồm:
              </p>
              <div className="space-y-1 ml-4">
                <p><span className="font-semibold text-warning">1. Thông tin doanh nghiệp:</span> Tên đơn vị KDVT, Mã số thuế, Số điện thoại</p>
                <p><span className="font-semibold text-warning">2. Thông tin lái xe:</span> Họ tên, GPLX, Ngày hết hạn</p>
                <p><span className="font-semibold text-warning">3. Thông tin phương tiện:</span> BKS, Đơn vị KDVT, Loại hình vận tải, Số người chuyển chở/Tải trọng xe, Số khung</p>
                <p><span className="font-semibold text-warning">4. Dữ liệu hình ảnh</span> (đối với khách hàng sử dụng camera giám sát trên xe): Tần suất, Kênh truyền hình ảnh (Chọn hình ảnh đúng vị trí đặt camera)</p>
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
                  onClick={() => setShowQuickAddPopup(true)}
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
                    <th className="px-4 py-3 text-left font-semibold w-44">Ngày cập nhật</th>
                    <th className="px-4 py-3 text-left font-semibold w-32">Trạng thái gửi DL</th>
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
                    <td className="px-4 py-3 text-sm">20/11/2025 09:45:30</td>
                    <td className="px-4 py-3">Chưa gửi</td>
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
      <Dialog open={showQuickAddPopup} onOpenChange={setShowQuickAddPopup}>
        <DialogContent className="max-w-[600px]">
          <div className="bg-warning text-warning-foreground px-4 py-3 -mx-6 -mt-6 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">BỔ SUNG NHANH THÔNG TIN TRUYỀN C08</h2>
            <button onClick={() => setShowQuickAddPopup(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-muted-foreground">Nội dung bổ sung nhanh bằng Excel...</p>
        </DialogContent>
      </Dialog>

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
    </>
  );
};
