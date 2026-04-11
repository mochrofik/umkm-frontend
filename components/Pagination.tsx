import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    loading: boolean;
    setCurrentPrev: () => void;
    setCurrentNext: () => void;
}

export default function Pagination({currentPage, lastPage, loading, setCurrentPrev, setCurrentNext}: PaginationProps) {


    return (
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t">
        <p className="text-sm text-slate-600">
          Halaman <span className="font-bold">{currentPage}</span> dari{" "}
          <span className="font-bold">{lastPage}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={setCurrentPrev}
            disabled={currentPage === 1 || loading}
            className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
           onClick={setCurrentNext}
            disabled={currentPage === lastPage || loading}
            className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    )

}