import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, RefreshCw } from "lucide-react";

interface CompanyExcelImportPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompanyExcelImportPopup = ({ open, onOpenChange }: CompanyExcelImportPopupProps) => {
  const [Company, setCompany] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] p-0 bg-background overflow-hidden">
        {/* Header */}
        <div className="bg-warning text-warning-foreground px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-warning-foreground text-warning rounded-full w-8 h-8 flex items-center justify-center font-bold">
              <Plus className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-lg">BỔ SUNG NHANH THÔNG TIN TRUYỀN C08</h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-warning-foreground hover:opacity-80 transition-opacity"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Filters and File Upload */}
          <div className="flex gap-4 items-center flex-wrap">
            <Select value={Company} onValueChange={setCompany}>
              <SelectTrigger className={`w-[200px] ${!Company ? 'text-muted-foreground' : ''}`}>
                <SelectValue placeholder="Chọn Công ty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Viettel Telecom">Viettel Telecom</SelectItem>
                <SelectItem value="Viettel Tuyên Quang">Viettel Tuyên Quang</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-3">
              <Select defaultValue="">
                <SelectTrigger className="w-[200px] text-muted-foreground">
                  <SelectValue placeholder="Chọn file excel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file1">File x</SelectItem>
                </SelectContent>
              </Select>

              <label htmlFor="file-upload">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  type="button"
                >
                  Chọn file
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <span className="text-sm text-muted-foreground">(Tối đa 2MB)</span>

              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
              >
                Tải mẫu Excel
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-16">STT</th>
                  <th className="px-4 py-3 text-left font-semibold w-32">Tên công ty (*)</th>
                  <th className="px-4 py-3 text-left font-semibold w-48">Mã số thuế (*)</th>
                  <th className="px-4 py-3 text-left font-semibold w-48">Số điện thoại (*)</th>
                  <th className="px-4 py-3 text-left font-semibold w-48">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">
                    Không có dữ liệu
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
        </div>

        {/* Footer Buttons */}
        <div className="bg-muted/30 px-6 py-4 flex justify-center gap-3">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Lưu
          </Button>
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-8"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
