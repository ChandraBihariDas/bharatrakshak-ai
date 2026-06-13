"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ─── Types ──────────────────────────────────────────────────────────────────

type Role = "citizen" | "responder" | "authority";

interface RoleConfig {
  label: string;
  tagline: string;
  accent: string;
  accentDim: string;
  badgeColor: string;
  icon: React.ReactNode;
  clearanceLevel: string;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const ShieldIcon = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 18l.46-1.08z" />
  </svg>
);

const KeyIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6M15.5 7.5l3 3L21 8l-3-3" />
  </svg>
);

const UserIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AlertIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const EyeIcon = ({ size = 16, open = true }: { size?: number; open?: boolean }) => open ? (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GridIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

// ─── Scanline / CRT overlay component ────────────────────────────────────────

const ScanGrid = () => (
  <div aria-hidden="true" style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(0,255,128,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,128,0.015) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  }} />
);

// ─── Animated corner brackets ─────────────────────────────────────────────────

const CornerBrackets = ({ color }: { color: string }) => (
  <>
    {[
      { top: -1, left: -1, rotate: "0deg" },
      { top: -1, right: -1, rotate: "90deg" },
      { bottom: -1, right: -1, rotate: "180deg" },
      { bottom: -1, left: -1, rotate: "270deg" },
    ].map((pos, i) => (
      <div key={i} style={{
        position: "absolute", width: 18, height: 18,
        borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`,
        transform: `rotate(${pos.rotate})`,
        ...pos,
        opacity: 0.8,
      }} />
    ))}
  </>
);

// ─── OTP Input ────────────────────────────────────────────────────────────────

const OTPInput = ({ value, onChange, accent }: { value: string; onChange: (v: string) => void; accent: string }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = digits.map((d, idx) => idx === i ? "" : d).join("");
      onChange(next);
      if (i > 0) refs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, val: string) => {
    const ch = val.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, idx) => idx === i ? ch : d).join("");
    onChange(next);
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          style={{
            width: 44, height: 52, textAlign: "center",
            background: "rgba(0,255,128,0.04)",
            border: `1px solid ${d ? accent : "rgba(255,255,255,0.12)"}`,
            borderRadius: 4, color: "#fff",
            fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
            outline: "none", caretColor: accent,
            transition: "border-color 0.2s",
          }}
        />
      ))}
    </div>
  );
};

// ─── Styled Input ─────────────────────────────────────────────────────────────

const Field = ({
  label, icon, type = "text", placeholder, value, onChange,
  accent, rightEl, autoComplete,
}: {
  label: string; icon: React.ReactNode; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; accent: string;
  rightEl?: React.ReactNode; autoComplete?: string;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
        fontFamily: "'JetBrains Mono', monospace",
      }}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: focused ? accent : "rgba(255,255,255,0.3)",
          transition: "color 0.2s", pointerEvents: "none",
        }}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "12px 40px 12px 40px",
            background: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? accent : "rgba(255,255,255,0.1)"}`,
            borderRadius: 6, color: "#fff",
            fontSize: 14, fontFamily: "'JetBrains Mono', monospace",
            outline: "none", transition: "all 0.2s",
            boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
          }}
        />
        {rightEl && (
          <span style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.3)", cursor: "pointer",
          }}>{rightEl}</span>
        )}
      </div>
    </div>
  );
};

// ─── Role configurations ─────────────────────────────────────────────────────

const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  citizen: {
    label: "Citizen",
    tagline: "Emergency access for the public",
    accent: "#00FF80",
    accentDim: "rgba(0,255,128,0.12)",
    badgeColor: "#00FF80",
    clearanceLevel: "PUBLIC",
    icon: <PhoneIcon size={14} />,
  },
  responder: {
    label: "First Responder",
    tagline: "Operational field access",
    accent: "#FFB800",
    accentDim: "rgba(255,184,0,0.12)",
    badgeColor: "#FFB800",
    clearanceLevel: "FIELD-OPS",
    icon: <UserIcon size={14} />,
  },
  authority: {
    label: "Authority",
    tagline: "Command-level secure access",
    accent: "#FF4D6A",
    accentDim: "rgba(255,77,106,0.12)",
    badgeColor: "#FF4D6A",
    clearanceLevel: "RESTRICTED",
    icon: <ShieldIcon size={14} />,
  },
};

// ─── Citizen Login ────────────────────────────────────────────────────────────

const CitizenLogin = ({ accent, onSubmit }: { accent: string; onSubmit: () => void }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setCountdown(30); setLoading(false); }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field
        label="Mobile Number"
        icon={<PhoneIcon />}
        type="tel"
        placeholder="+91 98765 43210"
        value={phone}
        onChange={setPhone}
        accent={accent}
        autoComplete="tel"
      />

      {!otpSent ? (
        <button
          onClick={sendOtp}
          disabled={phone.length < 10 || loading}
          style={{
            padding: "13px 0", borderRadius: 6, border: "none",
            background: phone.length >= 10 ? accent : "rgba(255,255,255,0.06)",
            color: phone.length >= 10 ? "#000" : "rgba(255,255,255,0.3)",
            fontWeight: 700, fontSize: 13, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: phone.length >= 10 ? "pointer" : "not-allowed",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Sending…" : "Send OTP"}
        </button>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}>One-Time Password</label>
              <button
                onClick={sendOtp}
                disabled={countdown > 0}
                style={{
                  background: "none", border: "none", fontSize: 11,
                  color: countdown > 0 ? "rgba(255,255,255,0.25)" : accent,
                  cursor: countdown > 0 ? "default" : "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
            <OTPInput value={otp} onChange={setOtp} accent={accent} />
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
              OTP sent to {phone}
            </p>
          </div>

          <button
            onClick={onSubmit}
            disabled={otp.length < 6}
            style={{
              padding: "13px 0", borderRadius: 6, border: "none",
              background: otp.length === 6 ? accent : "rgba(255,255,255,0.06)",
              color: otp.length === 6 ? "#000" : "rgba(255,255,255,0.3)",
              fontWeight: 700, fontSize: 13, letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: otp.length === 6 ? "pointer" : "not-allowed",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            Verify & Access
          </button>
        </>
      )}

      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 14px", borderRadius: 6,
        background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)",
      }}>
        <span style={{ color: "#FF4D6A", flexShrink: 0 }}><AlertIcon /></span>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: "#FF4D6A", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
            Emergency Registration
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
            For immediate distress situations — no account required
          </p>
        </div>
        <button style={{
          marginLeft: "auto", background: "#FF4D6A", border: "none",
          color: "#fff", fontSize: 11, fontWeight: 700, padding: "6px 12px",
          borderRadius: 4, cursor: "pointer", whiteSpace: "nowrap",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          SOS
        </button>
      </div>
    </div>
  );
};

// ─── Responder Login ──────────────────────────────────────────────────────────

const ResponderLogin = ({ accent, onSubmit }: { accent: string; onSubmit: () => void }) => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [showPw, setShowPw] = useState(false);

  const ready = empId && password && teamCode.length >= 4;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Field
        label="Employee ID"
        icon={<UserIcon />}
        placeholder="BR-RESP-XXXXX"
        value={empId}
        onChange={setEmpId}
        accent={accent}
        autoComplete="username"
      />
      <Field
        label="Password"
        icon={<LockIcon />}
        type={showPw ? "text" : "password"}
        placeholder="••••••••••"
        value={password}
        onChange={setPassword}
        accent={accent}
        autoComplete="current-password"
        rightEl={
          <span onClick={() => setShowPw(v => !v)}>
            <EyeIcon open={showPw} />
          </span>
        }
      />
      <Field
        label="Team Code"
        icon={<GridIcon />}
        placeholder="TEAM-ALPHA-01"
        value={teamCode}
        onChange={setTeamCode}
        accent={accent}
      />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{
          background: "none", border: "none",
          color: accent, fontSize: 12, cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          textDecoration: "underline",
        }}>
          Forgot credentials?
        </button>
      </div>

      <button
        onClick={onSubmit}
        disabled={!ready}
        style={{
          padding: "13px 0", borderRadius: 6, border: "none",
          background: ready ? accent : "rgba(255,255,255,0.06)",
          color: ready ? "#000" : "rgba(255,255,255,0.3)",
          fontWeight: 700, fontSize: 13, letterSpacing: "0.08em",
          textTransform: "uppercase", cursor: ready ? "pointer" : "not-allowed",
          fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.2s",
        }}
      >
        Access Field Operations
      </button>
    </div>
  );
};

// ─── Authority Login ──────────────────────────────────────────────────────────

const AuthorityLogin = ({ accent, onSubmit }: { accent: string; onSubmit: () => void }) => {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [mfa, setMfa] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [mfaMode, setMfaMode] = useState<"totp" | "sms">("totp");

  const ready = officerId && password && pin.length === 6 && mfa.length === 6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
        background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)",
        borderRadius: 6,
      }}>
        <span style={{ color: "#FF4D6A" }}><ShieldIcon size={14} /></span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
          CLASSIFICATION: <strong style={{ color: "#FF4D6A" }}>RESTRICTED</strong> — Authorised access only
        </span>
      </div>

      <Field
        label="Officer ID"
        icon={<UserIcon />}
        placeholder="IAS-XXX-XXXX / IPS-XXX-XXXX"
        value={officerId}
        onChange={setOfficerId}
        accent={accent}
        autoComplete="username"
      />
      <Field
        label="Password"
        icon={<LockIcon />}
        type={showPw ? "text" : "password"}
        placeholder="••••••••••"
        value={password}
        onChange={setPassword}
        accent={accent}
        autoComplete="current-password"
        rightEl={
          <span onClick={() => setShowPw(v => !v)}>
            <EyeIcon open={showPw} />
          </span>
        }
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
        }}>Security PIN (6-digit)</label>
        <OTPInput value={pin} onChange={setPin} accent={accent} />
      </div>

      {/* MFA Section */}
      <div style={{
        padding: 16, borderRadius: 6,
        border: "1px solid rgba(255,77,106,0.2)",
        background: "rgba(255,77,106,0.04)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
          }}>MFA Verification</span>
          <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
            {(["totp", "sms"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMfaMode(m)}
                style={{
                  padding: "4px 10px", border: "none", cursor: "pointer",
                  background: mfaMode === m ? accent : "transparent",
                  color: mfaMode === m ? "#000" : "rgba(255,255,255,0.4)",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                  textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.15s",
                }}
              >
                {m === "totp" ? "Authenticator" : "SMS"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
            {mfaMode === "totp"
              ? "Enter 6-digit code from your authenticator app"
              : "Enter 6-digit code sent to your registered mobile"}
          </p>
          <OTPInput value={mfa} onChange={setMfa} accent={accent} />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!ready}
        style={{
          padding: "14px 0", borderRadius: 6, border: "none",
          background: ready ? accent : "rgba(255,255,255,0.06)",
          color: ready ? "#000" : "rgba(255,255,255,0.3)",
          fontWeight: 700, fontSize: 13, letterSpacing: "0.08em",
          textTransform: "uppercase", cursor: ready ? "pointer" : "not-allowed",
          fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.2s",
          boxShadow: ready ? `0 0 20px ${accent}44` : "none",
        }}
      >
        Authenticate & Enter Command
      </button>
    </div>
  );
};

// ─── Success Screen ───────────────────────────────────────────────────────────

const SuccessScreen = ({ role, config }: { role: Role; config: RoleConfig }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 20, padding: "32px 0",
  }}>
    <div style={{
      width: 72, height: 72, borderRadius: "50%",
      background: `${config.accent}22`,
      border: `2px solid ${config.accent}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 32px ${config.accent}55`,
    }}>
      <ShieldIcon size={32} color={config.accent} />
    </div>
    <div style={{ textAlign: "center" }}>
      <p style={{
        margin: "0 0 4px", fontSize: 11, letterSpacing: "0.2em",
        color: config.accent, fontWeight: 700, textTransform: "uppercase",
        fontFamily: "'JetBrains Mono', monospace",
      }}>Access Granted</p>
      <h2 style={{
        margin: 0, fontSize: 22, color: "#fff", fontWeight: 700,
        fontFamily: "'JetBrains Mono', monospace",
      }}>Welcome, {config.label}</h2>
      <p style={{
        margin: "8px 0 0", fontSize: 13, color: "rgba(255,255,255,0.4)",
        fontFamily: "'JetBrains Mono', monospace",
      }}>Redirecting to BharatRakshak Dashboard…</p>
    </div>
    <div style={{
      width: "100%", height: 3, background: "rgba(255,255,255,0.06)",
      borderRadius: 99, overflow: "hidden",
    }}>
      <div style={{
        height: "100%", background: config.accent, borderRadius: 99,
        animation: "progress 2s linear forwards",
      }} />
    </div>
    <style>{`
      @keyframes progress { from { width: 0%; } to { width: 100%; } }
    `}</style>
  </div>
);

// ─── Role Selector Tab ────────────────────────────────────────────────────────

const RoleTab = ({
  role, active, config, onClick,
}: { role: Role; active: boolean; config: RoleConfig; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1, padding: "10px 4px", border: "none",
      borderBottom: `2px solid ${active ? config.accent : "transparent"}`,
      background: "transparent", cursor: "pointer",
      color: active ? "#fff" : "rgba(255,255,255,0.35)",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
      transition: "all 0.2s",
    }}
  >
    {config.label}
  </button>
);

// ─── Main Login Page ──────────────────────────────────────────────────────────

function LoginPageInner() {
  const searchParams = useSearchParams();
  const rawRole = searchParams.get("role") as Role | null;
  const defaultRole: Role = rawRole && ROLE_CONFIGS[rawRole] ? rawRole : "citizen";

  const [activeRole, setActiveRole] = useState<Role>(defaultRole);
  const [success, setSuccess] = useState(false);
  const config = ROLE_CONFIGS[activeRole];

  useEffect(() => {
    // Update URL without navigation when tab changes
    const url = new URL(window.location.href);
    url.searchParams.set("role", activeRole);
    window.history.replaceState(null, "", url.toString());
  }, [activeRole]);

  const handleSubmit = () => setSuccess(true);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        ::placeholder { color: rgba(255,255,255,0.2) !important; }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0px 1000px #0d1117 inset;
          transition: background-color 5000s ease-in-out 0s;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <ScanGrid />

      {/* Background glow blobs */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accent}18 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accent}10 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }} />
      </div>

      {/* Main Layout */}
      <div style={{
        minHeight: "100vh", display: "flex",
        background: "#080B0F",
        fontFamily: "'JetBrains Mono', monospace",
        position: "relative", zIndex: 1,
      }}>

        {/* Left Panel — Branding */}
        <div style={{
          display: "none",
          flex: "0 0 420px",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 40px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.015)",
          // Show on medium+ screens via inline media — we'll handle with a wrapper trick
        }}
          className="left-panel"
        >
          {/* Logo */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 48,
            }}>
              <div style={{ position: "relative", animation: "float 3s ease-in-out infinite" }}>
                <div style={{
                  position: "absolute", inset: -6, borderRadius: "50%",
                  border: `1px solid ${config.accent}`,
                  animation: "pulse-ring 2.5s ease-out infinite",
                  transition: "border-color 0.4s",
                }} />
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `${config.accent}22`,
                  border: `2px solid ${config.accent}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.4s",
                }}>
                  <ShieldIcon size={20} color={config.accent} />
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                  BharatRakshak
                </p>
                <p style={{ margin: 0, fontSize: 10, color: config.accent, letterSpacing: "0.2em", fontWeight: 600 }}>
                  AI COMMAND CENTER
                </p>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{
                fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)",
                marginBottom: 16, textTransform: "uppercase",
              }}>
                Active Role
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 14px", borderRadius: 6,
                background: `${config.accent}18`,
                border: `1px solid ${config.accent}44`,
              }}>
                <span style={{ color: config.accent }}>{config.icon}</span>
                <span style={{ color: config.accent, fontWeight: 700, fontSize: 13 }}>
                  {config.label}
                </span>
                <span style={{
                  fontSize: 9, padding: "2px 6px", borderRadius: 3,
                  background: `${config.accent}22`, color: config.accent,
                  fontWeight: 700, letterSpacing: "0.15em",
                }}>
                  {config.clearanceLevel}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["Real-time crisis mapping across all districts", "●"],
                ["Encrypted inter-agency communication", "●"],
                ["AI-driven resource allocation & dispatch", "●"],
                ["Predictive threat modelling & alerts", "●"],
              ].map(([text, dot], i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{
                    color: config.accent, fontSize: 8, marginTop: 4, flexShrink: 0,
                    transition: "color 0.4s",
                  }}>{dot}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom status bar */}
          <div style={{
            padding: "16px", borderRadius: 8,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                SYSTEM STATUS
              </span>
              <span style={{ fontSize: 10, color: "#00FF80", letterSpacing: "0.1em", fontWeight: 700 }}>
                ● OPERATIONAL
              </span>
            </div>
            {[
              ["Threat Level", "MODERATE"],
              ["Active Incidents", "247"],
              ["Responders Online", "1,832"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 0", borderTop: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{k}</span>
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Auth Form */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px 16px",
        }}>
          <div style={{
            width: "100%", maxWidth: 440,
            animation: "fadeSlideUp 0.4s ease both",
          }}>

            {/* Mobile Logo */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: 36, justifyContent: "center",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${config.accent}22`,
                border: `1.5px solid ${config.accent}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.4s",
              }}>
                <ShieldIcon size={16} color={config.accent} />
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>BharatRakshak</span>
                <span style={{ fontSize: 9, display: "block", color: config.accent, letterSpacing: "0.18em", fontWeight: 600 }}>
                  AI COMMAND CENTER
                </span>
              </div>
            </div>

            {/* Card */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
            }}>
              <CornerBrackets color={config.accent} />

              {/* Role tabs */}
              <div style={{
                display: "flex",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                {(Object.keys(ROLE_CONFIGS) as Role[]).map(r => (
                  <RoleTab
                    key={r}
                    role={r}
                    active={activeRole === r}
                    config={ROLE_CONFIGS[r]}
                    onClick={() => { setActiveRole(r); setSuccess(false); }}
                  />
                ))}
              </div>

              {/* Form body */}
              <div style={{ padding: "28px 28px 32px" }}>
                {success ? (
                  <SuccessScreen role={activeRole} config={config} />
                ) : (
                  <div key={activeRole} style={{ animation: "fadeSlideUp 0.3s ease both" }}>
                    {/* Header */}
                    <div style={{ marginBottom: 28 }}>
                      <div style={{
                        fontSize: 10, letterSpacing: "0.2em", color: config.accent,
                        fontWeight: 700, marginBottom: 8, textTransform: "uppercase",
                        transition: "color 0.4s",
                      }}>
                        {config.clearanceLevel} ACCESS
                      </div>
                      <h1 style={{
                        margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#fff",
                        letterSpacing: "0.01em",
                      }}>
                        {activeRole === "citizen" ? "Citizen Portal" :
                          activeRole === "responder" ? "Field Operations" : "Command Access"}
                      </h1>
                      <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.38)" }}>
                        {config.tagline}
                      </p>
                    </div>

                    {activeRole === "citizen" && (
                      <CitizenLogin accent={config.accent} onSubmit={handleSubmit} />
                    )}
                    {activeRole === "responder" && (
                      <ResponderLogin accent={config.accent} onSubmit={handleSubmit} />
                    )}
                    {activeRole === "authority" && (
                      <AuthorityLogin accent={config.accent} onSubmit={handleSubmit} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <p style={{
              textAlign: "center", marginTop: 20, fontSize: 10,
              color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em",
            }}>
              BHARATRAKSHAK AI · MINISTRY OF HOME AFFAIRS · GOVERNMENT OF INDIA
            </p>
          </div>
        </div>
      </div>

      {/* Responsive left panel display */}
      <style>{`
        @media (min-width: 900px) {
          .left-panel { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: "100vh", background: "#080B0F",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontSize: 12,
        letterSpacing: "0.2em",
      }}>
        INITIALIZING SECURE SESSION…
      </div>
    }>
      <LoginPageInner />
    </Suspense>
  );
}