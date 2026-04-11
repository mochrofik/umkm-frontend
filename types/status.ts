
export interface StatusInfo {
  label: string;
  color: string;
}

export const STATUS_MAP:Record<string, StatusInfo> = {
  active: {
    label :  "Aktif" ,
    color: "bg-green-100 text-green-700" ,
  },
  verify: {
    label: "Menunggu Verifikasi" ,
    color: "bg-blue-100 text-blue-700" ,
  },
  banned: {
    label: "Terblokir",
    color: "bg-red-100 text-red-700" ,
  },
};

export const DEFAULT_STATUS = {
  label: "Inactive" ,
  color: "bg-gray-100 text-gray-700" ,
};
