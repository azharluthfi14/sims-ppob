export const formatRupiah = (val: string) =>
  val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const unformatRupiah = (val: string) => val.replace(/\./g, '');
