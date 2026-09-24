import type { Metadata } from "next";

import BajajAppRedirect from "./BajajAppRedirect";

export const metadata: Metadata = {
  title: "Download the Bajaj Finserv app | Transetu",
  description: "Download the Bajaj Finserv app to manage your FASTag.",
  // Customers only ever reach this page from the SMS or email we send them.
  // It has nothing to offer search, and a redirect page in the results would
  // only confuse people looking for Transetu.
  robots: { index: false, follow: false },
};

export default function BajajAppPage() {
  return <BajajAppRedirect />;
}
