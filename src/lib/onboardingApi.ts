/**
 * TranSetu Onboarding & Auth API Client
 *
 * Integrates with the existing Node.js backend (transetu-nodejs):
 * - POST /v1/auth/send-otp
 * - POST /v1/auth/verify-otp
 * - POST /v1/onboarding/request
 * - POST /v1/onboarding/documents
 * - POST /v1/onboarding/bank-details
 *
 * IMPORTANT SECURITY RULES:
 * - Do NOT log sensitive values (passwords, Aadhaar, PAN, bank account numbers).
 * - Do NOT persist credentials, tokens, or documents in localStorage/sessionStorage.
 */

export const API_BASE_URL = "https://api.transetu.com";

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: ApiErrorDetail[] | null;
  statusCode?: number;
}

/**
 * Send OTP for mobile verification via Node API:
 * POST /v1/auth/send-otp
 */
export async function sendOtpApi(phone: string, purpose: string = "REGISTER") {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;

  try {
    const res = await fetch(`${API_BASE_URL}/v1/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: formattedPhone,
        purpose,
      }),
    });

    const data: ApiResponse<{ otp_id: string }> = await res.json().catch(() => ({
      success: false,
      message: "Failed to parse server response",
      data: null,
    }));

    const rawData =
      data && typeof data === "object"
        ? (data as unknown as Record<string, unknown>)
        : {};
    const innerData =
      rawData.data && typeof rawData.data === "object"
        ? (rawData.data as Record<string, unknown>)
        : {};

    const extractedOtpId: string | null =
      (typeof innerData.otp_id === "string" && innerData.otp_id) ||
      (typeof rawData.otp_id === "string" && rawData.otp_id) ||
      (typeof innerData.otpId === "string" && innerData.otpId) ||
      (typeof rawData.otpId === "string" && rawData.otpId) ||
      (typeof innerData.id === "string" && innerData.id) ||
      (typeof rawData.id === "string" && rawData.id) ||
      null;

    const errMsg =
      data.message ||
      data.errors?.[0]?.message ||
      "Failed to send OTP verification code.";

    const isSuccess =
      res.ok &&
      (data.success === true ||
        (res.status >= 200 && res.status < 300 && data.success !== false));

    return {
      ok: isSuccess && Boolean(extractedOtpId),
      status: res.status,
      message: errMsg,
      data: {
        ...innerData,
        otp_id: extractedOtpId || "",
      },
      errors: data.errors,
    };
  } catch (error: unknown) {
    const isNetworkError = error instanceof TypeError;
    return {
      ok: false,
      status: 0,
      message: isNetworkError
        ? "Network error: unable to connect to authentication server."
        : "Failed to dispatch verification code.",
      data: null,
      errors: null,
    };
  }
}

/**
 * Verify OTP via Node API:
 * POST /v1/auth/verify-otp
 */
export async function verifyOtpApi(
  otpId: string,
  otp: string,
  purpose: string = "REGISTER"
) {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp_id: otpId,
        otp,
        purpose,
      }),
    });

    const data: ApiResponse<{ verified: boolean }> = await res.json().catch(() => ({
      success: false,
      message: "Failed to parse server response",
      data: null,
    }));

    const rawData =
      data && typeof data === "object"
        ? (data as unknown as Record<string, unknown>)
        : {};
    const innerData =
      rawData.data && typeof rawData.data === "object"
        ? (rawData.data as Record<string, unknown>)
        : {};

    const errMsg =
      data.message ||
      data.errors?.[0]?.message ||
      "Invalid OTP entered";

    const isSuccess =
      res.ok &&
      (data.success === true ||
        (res.status >= 200 && res.status < 300 && data.success !== false));

    const isVerified =
      isSuccess &&
      (innerData.verified === true ||
        rawData.verified === true ||
        innerData.status === "VERIFIED" ||
        rawData.status === "VERIFIED" ||
        (innerData.verified !== false && rawData.verified !== false));

    return {
      ok: isVerified,
      status: res.status,
      message: errMsg,
      data: {
        ...innerData,
        verified: isVerified,
      },
      errors: data.errors,
    };
  } catch (error: unknown) {
    const isNetworkError = error instanceof TypeError;
    return {
      ok: false,
      status: 0,
      message: isNetworkError
        ? "Network error: unable to connect to verification server."
        : "Failed to verify code.",
      data: null,
      errors: null,
    };
  }
}

export interface OnboardingSubmitPayload {
  mobileNumber: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  notes: string;
  profilePicture: File | null;
  aadhaarNumber: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  panNumber: string;
  panFront: File | null;
  panBack: File | null;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  bankPassbook?: File | null;
}

/**
 * Execute complete onboarding request flow:
 * 1. POST /v1/onboarding/request (creates account & receives onboarding_access_token)
 * 2. POST /v1/onboarding/documents (Aadhaar front & back)
 * 3. POST /v1/onboarding/documents (PAN front & back)
 * 4. POST /v1/onboarding/bank-details (bank account details)
 */
export async function submitOnboardingFlow(payload: OnboardingSubmitPayload): Promise<{
  success: boolean;
  message: string;
  onboardingId?: string;
  errors?: ApiErrorDetail[];
}> {
  const cleanMobile = payload.mobileNumber.replace(/\D/g, "");
  const formattedPhone =
    cleanMobile.length === 10 ? `+91${cleanMobile}` : `+${cleanMobile}`;

  // Step 1: Create Account Request
  const requestForm = new FormData();
  requestForm.append("full_name", payload.fullName.trim());
  requestForm.append("email", payload.email.trim().toLowerCase());
  requestForm.append("phone", formattedPhone);
  requestForm.append("password", payload.password);
  requestForm.append("confirm_password", payload.confirmPassword);
  if (payload.notes.trim()) {
    requestForm.append("notes", payload.notes.trim());
  } else {
    requestForm.append("notes", "Agent application submitted via website");
  }
  if (payload.profilePicture) {
    requestForm.append("profile_pic", payload.profilePicture);
  }

  let token: string | null = null;
  let onboardingId: string | undefined = undefined;

  try {
    const res = await fetch(`${API_BASE_URL}/v1/onboarding/request`, {
      method: "POST",
      body: requestForm,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      const errMsg =
        json?.message ||
        json?.errors?.[0]?.message ||
        (res.status === 404
          ? `Onboarding endpoint not found on staging server (HTTP 404). Please ensure ${API_BASE_URL} is active.`
          : `Server returned HTTP ${res.status}: ${res.statusText || "Request failed"}`);
      return {
        success: false,
        message: errMsg,
        errors: json?.errors || undefined,
      };
    }

    token = json.data?.onboarding_access_token;
    onboardingId = json.data?.id;
  } catch (err: unknown) {
    const isNetwork = err instanceof TypeError;
    return {
      success: false,
      message: isNetwork
        ? `Unable to connect to staging server at ${API_BASE_URL}. The service may be offline or blocked by network/CORS.`
        : "Failed to submit onboarding request due to a network connection error.",
    };
  }

  if (!token) {
    return {
      success: false,
      message: "Server did not return an onboarding session token.",
    };
  }

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  // Helper for document uploads
  const uploadDoc = async (
    type: "aadhar" | "pan",
    docNumber: string,
    side: "front" | "back",
    file: File
  ): Promise<{ ok: boolean; message?: string }> => {
    const docForm = new FormData();
    docForm.append("document_type", type);
    docForm.append("document_number", docNumber);

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    docForm.append("document_format", isPdf ? "pdf" : "images");
    if (!isPdf || side === "front") {
      docForm.append("document_side", side);
    }
    docForm.append("document", file);

    try {
      const docRes = await fetch(`${API_BASE_URL}/v1/onboarding/documents`, {
        method: "POST",
        headers: authHeaders,
        body: docForm,
      });

      const json = await docRes.json().catch(() => null);
      if (!docRes.ok || !json?.success) {
        return {
          ok: false,
          message:
            json?.message ||
            json?.errors?.[0]?.message ||
            `Failed to upload ${type.toUpperCase()} (${side}) document (HTTP ${docRes.status}).`,
        };
      }
      return { ok: true };
    } catch {
      return {
        ok: false,
        message: `Network error while uploading ${type.toUpperCase()} (${side}) document.`,
      };
    }
  };

  // Step 2: Upload Aadhaar documents if provided
  const cleanAadhaar = payload.aadhaarNumber.replace(/\s+/g, "");
  if (payload.aadhaarFront) {
    const res = await uploadDoc("aadhar", cleanAadhaar, "front", payload.aadhaarFront);
    if (!res.ok) {
      return {
        success: false,
        message: res.message || "Failed to upload Aadhaar front document.",
        onboardingId,
      };
    }
  }
  if (payload.aadhaarBack) {
    const res = await uploadDoc("aadhar", cleanAadhaar, "back", payload.aadhaarBack);
    if (!res.ok) {
      return {
        success: false,
        message: res.message || "Failed to upload Aadhaar back document.",
        onboardingId,
      };
    }
  }

  // Step 3: Upload PAN documents if provided
  const cleanPan = payload.panNumber.trim().toUpperCase();
  if (payload.panFront) {
    const res = await uploadDoc("pan", cleanPan, "front", payload.panFront);
    if (!res.ok) {
      return {
        success: false,
        message: res.message || "Failed to upload PAN front document.",
        onboardingId,
      };
    }
  }
  if (payload.panBack) {
    const res = await uploadDoc("pan", cleanPan, "back", payload.panBack);
    if (!res.ok) {
      return {
        success: false,
        message: res.message || "Failed to upload PAN back document.",
        onboardingId,
      };
    }
  }

  // Step 4: Submit Bank Details
  const cleanAccount = payload.accountNumber.replace(/\s+/g, "");
  try {
    const bankRes = await fetch(`${API_BASE_URL}/v1/onboarding/bank-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        bank_name: payload.bankName.trim(),
        bank_account_holder_name: payload.accountHolderName.trim(),
        bank_account_number: cleanAccount,
        bank_ifsc_code: payload.ifscCode.trim().toUpperCase(),
        bank_branch_name: payload.branchName.trim(),
      }),
    });

    const bankJson = await bankRes.json().catch(() => null);
    if (!bankRes.ok || !bankJson?.success) {
      return {
        success: false,
        message:
          bankJson?.message ||
          bankJson?.errors?.[0]?.message ||
          "Account created, but saving bank details failed. Please verify bank information.",
        onboardingId,
      };
    }
  } catch {
    return {
      success: false,
      message:
        "Account created, but unable to submit bank details due to a network connection error.",
      onboardingId,
    };
  }

  return {
    success: true,
    message: "Your onboarding application has been submitted successfully.",
    onboardingId,
  };
}
