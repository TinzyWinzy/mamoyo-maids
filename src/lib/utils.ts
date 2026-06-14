export function getWhatsAppUrl(phone: string, message?: string): string {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}${encoded ? `?text=${encoded}` : ""}`;
}

export function getPhoneUrl(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
