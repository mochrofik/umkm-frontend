import { Store } from "@/types/stores";

interface StoreCardProps {
    data: Store
}
export default function CardStore({data}: StoreCardProps){

    const formatter = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
    return (
         
            <div
              key={data.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm flex border"
            >
              <div className="w-32 h-24 bg-gray-200">
                <img
                  src={data.logo_url}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex-1">
                <h3 className="font-bold text-black text-sm">{data.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{data.description}</p>
                <div className="flex items-center mt-2 text-xs">
                  <span className="text-yellow-500">
                    ⭐ {formatter.format(data.rating)}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-500">
                    { data.jarak < 1 
                            ? `${formatter.format((data.jarak) * 1000)} m` 
                            : `${formatter.format(data.jarak)} km`
                        }
                  </span>
                </div>
              </div>
            </div>
          )
        
        
       
    

}