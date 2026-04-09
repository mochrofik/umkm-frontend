export function intToRP(value: string | number){
  if (!value) return "";
  const numberString = value.toString().replace(/[^0-9]/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");


}