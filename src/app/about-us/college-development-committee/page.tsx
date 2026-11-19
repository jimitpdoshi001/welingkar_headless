import type { Metadata } from "next";
import { CdcPage } from "@/components/about/CdcPage/CdcPage";
import { CDC_INTRO, CDC_MEMBERS } from "@/lib/about/cdc-data";

export const metadata: Metadata = { title: "College Development Committee — Welingkar" };

export default function Page() {
  return <CdcPage title={CDC_INTRO.title} members={CDC_MEMBERS} />;
}
