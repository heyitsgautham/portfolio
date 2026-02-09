"use client";

import { MessageCircleIcon } from "lucide-react";

import { useIsClient } from "@/hooks/use-is-client";
import { decodePhoneNumber } from "@/utils/string";

import { IntroItem } from "./intro-item";

export function PhoneItem({ phoneNumber }: { phoneNumber: string }) {
  const isClient = useIsClient();
  const decodedPhone = isClient ? decodePhoneNumber(phoneNumber) : "";
  const cleanPhone = decodedPhone.replace(/\D/g, ""); // Remove non-digits

  return (
    <IntroItem
      icon={MessageCircleIcon}
      content={isClient ? `wa.me/${cleanPhone}` : "[WhatsApp protected]"}
      href={isClient ? `https://wa.me/${cleanPhone}` : "#"}
    />
  );
}
