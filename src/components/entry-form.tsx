"use client";

import { useState } from "react";

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  options: string[];
};

const STAGE_ONE_QUESTIONS: Question[] = [
  {
    id: "interest",
    title: "Are you serious about becoming a profitable daytrader?*",
    subtitle: "If not, STOP AND LEAVE THIS PAGE.",
    options: ["Yes", "No"],
  },
  {
    id: "pain-point",
    title: "What's the #1 obstacle standing between you and trading success?*",
    subtitle: "Select the option that fits you best:",
    options: [
      "Risk management",
      "Experience level",
      "Lack of funds",
      "Psychology",
      "Working full-time",
    ],
  },
  {
    id: "age",
    title: "How old are you today? Choose the best option below:*",
    subtitle:
      "We'll make sure you have the right help based on your age group.",
    options: [
      // TODO: under 18 should bifurcate into a different web flow.
      "I'm under 18",
      "18-21",
      "22-24",
      "25+",
    ],
  },
  {
    id: "income",
    title: "What is your monthly income?*",
    subtitle:
      "We ask this to make sure you have trading capital, or can afford to pay for funded accounts.",
    options: [
      "Under $1,000",
      "$1,000–$3,000",
      "$3,000–$5,000",
      "$5,000–$8,000",
      "Above $8,000",
    ],
  },
];

export function ApplicationForm() {
  const [step, setStep] = useState(0);

  // IMPORTANT:
  // This stores the selected option but does NOT advance.
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = STAGE_ONE_QUESTIONS.length;

  const currentQuestion = STAGE_ONE_QUESTIONS[step];

  const isEmailStep = step === totalQuestions;

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setError("");
  };

  const nextStep = () => {
    if (!currentQuestion) return;

    if (!selectedAnswer) {
      setError("Selecciona una opción para continuar.");
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    };

    setAnswers(updatedAnswers);

    // Reset selection for the next question.
    setSelectedAnswer("");

    setError("");

    setStep((current) => current + 1);
  };

  const previousStep = () => {
    if (step === 0) return;

    const previousQuestion = STAGE_ONE_QUESTIONS[step - 1];

    setStep((current) => current - 1);

    setSelectedAnswer(answers[previousQuestion.id] ?? "");

    setError("");
  };

  const submitLead = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Introduce tu email para recibir la clase.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Introduce un email válido.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead: {
            email: cleanEmail,
            answers,

            timestamp: new Date().toISOString(),

            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,

            screen: {
              width: window.screen.width,
              height: window.screen.height,
              colorDepth: window.screen.colorDepth,
            },

            referrer: document.referrer,
            page: window.location.href,

            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      /*
       * At this point you can:
       *
       * 1. Redirect to the video
       * 2. Reveal the video underneath
       * 3. Redirect to a private video page
       *
       * I'd personally reveal/redirect to the actual class here.
       */

      window.location.href = "https://rokitg.substack.com/subscribe";
    } catch (error) {
      console.error(error);

      setError("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = isEmailStep
    ? 100
    : ((step + 1) / (totalQuestions + 1)) * 100;

  return (
    <section
      id="contact-form"
      style={{
        minHeight: "100vh",
        padding: "100px 20px",
        scrollMarginTop: 40,
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(38px, 6vw, 68px)",
              lineHeight: 0.98,
              fontWeight: 900,
              letterSpacing: "-0.045em",
            }}
          >
            Estás a un paso de
            <br />
            recibir la <span style={{ color: "#ed1238" }}>clase gratis</span>
          </h2>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 500,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
            }}
          >
            Responde unas preguntas rápidas y te damos acceso.
          </p>
        </div>

        {/* CARD */}

        <div
          style={{
            overflow: "hidden",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "linear-gradient(145deg, #151519, #0c0c0f)",
            boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
          }}
        >
          {/* PROGRESS */}

          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#ed1238",
                boxShadow: "0 0 15px rgba(237,18,56,0.8)",
                transition: "width 250ms ease",
              }}
            />
          </div>

          <div
            style={{
              padding: "clamp(30px, 6vw, 54px)",
            }}
          >
            {/* QUESTION */}

            {!isEmailStep && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <div
                    style={{
                      marginBottom: 20,
                      color: "#ed1238",
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {String(step + 1).padStart(2, "0")} →{" "}
                    {String(totalQuestions + 1).padStart(2, "0")}
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(30px, 5vw, 46px)",
                      lineHeight: 1.02,
                      fontWeight: 900,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {currentQuestion.title}
                  </h3>

                  {currentQuestion.subtitle && (
                    <p
                      style={{
                        marginTop: 10,
                        color: "rgba(255,255,255,0.45)",
                        fontSize: 14,
                      }}
                    >
                      {currentQuestion.subtitle}
                    </p>
                  )}
                </div>

                {/* OPTIONS */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {currentQuestion.options.map((option, index) => {
                    const selected = selectedAnswer === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectAnswer(option)}
                        style={{
                          width: "100%",
                          minHeight: 62,
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          textAlign: "left",
                          cursor: "pointer",
                          borderRadius: 12,

                          border: selected
                            ? "1px solid #ed1238"
                            : "1px solid rgba(255,255,255,0.10)",

                          background: selected
                            ? "rgba(237,18,56,0.12)"
                            : "rgba(255,255,255,0.025)",

                          color: "#fff",

                          boxShadow: selected
                            ? "0 0 25px rgba(237,18,56,0.08)"
                            : "none",

                          transition: "all 160ms ease",
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,

                            border: selected
                              ? "1px solid #ed1238"
                              : "1px solid rgba(255,255,255,0.12)",

                            color: selected
                              ? "#ed1238"
                              : "rgba(255,255,255,0.45)",

                            fontFamily: "monospace",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 650,
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ERROR */}

                {error && (
                  <p
                    role="alert"
                    style={{
                      margin: "14px 0 0",
                      color: "#ff526e",
                      fontSize: 13,
                    }}
                  >
                    {error}
                  </p>
                )}

                {/* NEXT */}

                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    width: "100%",
                    minHeight: 60,
                    marginTop: 22,
                    border: 0,
                    borderRadius: 12,
                    background: selectedAnswer
                      ? "#ed1238"
                      : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    cursor: selectedAnswer ? "pointer" : "not-allowed",
                    fontSize: 16,
                    fontWeight: 900,
                    transition: "background 160ms ease",
                  }}
                >
                  SIGUIENTE →
                </button>
              </>
            )}

            {/* EMAIL */}

            {isEmailStep && (
              <>
                <div style={{ marginBottom: 30 }}>
                  <div
                    style={{
                      marginBottom: 20,
                      color: "#ed1238",
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                    }}
                  >
                    05 → 05
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(30px, 5vw, 46px)",
                      lineHeight: 1.02,
                      fontWeight: 900,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    ¿Dónde quieres recibir
                    <br />
                    la clase?
                  </h3>

                  <p
                    style={{
                      marginTop: 10,
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 14,
                    }}
                  >
                    Introduce tu email y te damos acceso.
                  </p>
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Tu mejor email"
                  autoComplete="email"
                  autoFocus
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: 62,
                    padding: "0 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    outline: "none",
                    background: "rgba(255,255,255,0.035)",
                    color: "#fff",
                    fontSize: 17,
                  }}
                />

                {error && (
                  <p
                    role="alert"
                    style={{
                      margin: "10px 0 0",
                      color: "#ff526e",
                      fontSize: 13,
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submitLead}
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    minHeight: 64,
                    marginTop: 14,
                    border: 0,
                    borderRadius: 12,
                    background: "#ed1238",
                    color: "#fff",
                    cursor: isSubmitting ? "wait" : "pointer",
                    fontSize: 17,
                    fontWeight: 900,
                    boxShadow: "0 12px 35px rgba(237,18,56,0.28)",
                  }}
                >
                  {isSubmitting
                    ? "PREPARANDO TU ACCESO..."
                    : "QUIERO MI CLASE GRATIS →"}
                </button>
              </>
            )}

            {/* BACK */}

            {step > 0 && (
              <button
                type="button"
                onClick={previousStep}
                style={{
                  display: "block",
                  marginTop: 22,
                  border: 0,
                  padding: 0,
                  background: "transparent",
                  color: "rgba(255,255,255,0.38)",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                ← Volver
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
