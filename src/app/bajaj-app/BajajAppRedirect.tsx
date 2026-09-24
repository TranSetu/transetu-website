"use client";

import { useEffect } from "react";

import "./bajaj-app.css";

/**
 * Landing page for the "Send Bajaj App Link" service.
 *
 * The SMS an agent sends carries this page's URL, not a store URL, for two
 * reasons: the customer may be on either platform and the agent has no way of
 * knowing which, and the SMS text is a DLT-approved content template that
 * cannot be edited without a fresh approval from the operator. Store links
 * change here instead.
 *
 * So: do not change this page's path. `https://transetu.com/bajaj-app/` is the
 * text inside the approved template, and the trailing slash matters —
 * next.config.ts sets `trailingSlash: true`. See ts-platform/docs/sms-dlt/.
 *
 * The copy says "Bajaj Finance", not "Bajaj Finserv", because that is the name
 * on both store listings the customer is about to land on, and it matches the
 * wording of the SMS that brought them here.
 */

// "Bajaj Finance : UPI & Loan App" by Bajaj Finance Limited. The package name
// is org.altruist.BajajExperia, from when the app was called Bajaj Experia —
// it does not match the app's current name, so don't "correct" it.
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=org.altruist.BajajExperia";

// Bajaj publishes several iOS apps; this is the listing that pairs with the
// Android package above.
const IOS_URL = "https://apps.apple.com/in/app/bajaj-finance-loans-upi-fd/id505454145";

type Platform = "android" | "ios" | "other";

const detectPlatform = (userAgent: string): Platform => {
  if (/android/i.test(userAgent)) return "android";
  // iPadOS 13+ reports itself as a Mac, so the touch-point check catches the
  // iPads that the plain userAgent test misses.
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1) return "ios";
  return "other";
};

export default function BajajAppRedirect() {
  useEffect(() => {
    // ?stay=1 keeps the page open so we can look at it on a real phone.
    if (new URLSearchParams(window.location.search).has("stay")) return;

    const platform = detectPlatform(window.navigator.userAgent);
    const target =
      platform === "android" ? ANDROID_URL : platform === "ios" ? IOS_URL : null;

    if (!target) return;

    // replace(), not assign(): otherwise "back" from the store lands here and
    // bounces the customer straight out again.
    window.location.replace(target);
  }, []);

  return (
    <main className="bajaj-wrap">
      <div className="bajaj-card">
        {/* width and height are set so the logo holds its box before the image
            arrives, instead of jumping when it loads. 2170x725 scaled to 40 high. */}
        <img
          className="bajaj-logo"
          src="/assets/Nav_logo.png"
          alt="Transetu"
          width={120}
          height={40}
        />

        <h1>Download the Bajaj Finance app</h1>
        <p className="bajaj-lead">
          Your FASTag is issued by Bajaj Finance. Use their app to manage it.
        </p>

        <a className="bajaj-btn" href={ANDROID_URL} rel="noopener">
          Android phone: get the app
        </a>

        <a className="bajaj-btn bajaj-btn-secondary" href={IOS_URL} rel="noopener">
          iPhone: get the app
        </a>

        <p className="bajaj-hint">
          If the app store does not open on its own, tap the button for your
          phone.
        </p>
      </div>
    </main>
  );
}
