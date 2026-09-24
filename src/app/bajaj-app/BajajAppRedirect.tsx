"use client";

import { useEffect } from "react";

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
    <main className="wrap">
      <div className="card">
        <img className="logo" src="/assets/Nav_logo.png" alt="Transetu" />

        <h1>Download the Bajaj Finserv app</h1>
        <p className="lead">
          Your FASTag is issued by Bajaj Finserv. Use their app to manage it.
        </p>

        <a className="btn" href={ANDROID_URL} rel="noopener">
          Android phone: get the app
        </a>

        <a className="btn btn-secondary" href={IOS_URL} rel="noopener">
          iPhone: get the app
        </a>

        <p className="hint">
          If the app store does not open on its own, tap the button for your
          phone.
        </p>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #eaf4ee;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border: 1px solid #dce8e1;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 18px 40px -24px rgba(16, 35, 29, 0.35);
        }

        .logo {
          height: 40px;
          width: auto;
          margin: 0 auto 24px;
        }

        h1 {
          font-size: 22px;
          font-weight: 700;
          color: #10231d;
          margin-bottom: 10px;
        }

        .lead {
          font-size: 15px;
          color: #263d35;
          margin-bottom: 24px;
        }

        .btn {
          display: block;
          width: 100%;
          background: #05a223;
          color: #ffffff;
          padding: 15px 16px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 20px -8px rgba(5, 162, 35, 0.5);
        }

        .btn + .btn {
          margin-top: 12px;
        }

        .btn-secondary {
          background: #ffffff;
          color: #05a223;
          border: 1px solid #05a223;
          box-shadow: none;
        }

        .hint {
          margin-top: 20px;
          font-size: 13px;
          color: #263d35;
        }
      `}</style>
    </main>
  );
}
