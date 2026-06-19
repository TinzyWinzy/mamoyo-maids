export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `whatsapp://send?phone=${cleanPhone}${encoded ? `&text=${encoded}` : ""}`;
}

export function getWhatsAppWebUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ""}`;
}

export function getPhoneUrl(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
