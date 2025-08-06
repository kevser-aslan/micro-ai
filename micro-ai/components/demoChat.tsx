'use client';

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function DemoChat() {
  const t = useTranslations("demoChat");

  const exampleAnswers: Record<string, string> = {
    [t("shippingQuestion")]: t("shippingAnswer"),
    [t("appointmentQuestion")]: t("appointmentAnswer"),
    [t("trainingDurationQuestion")]: t("trainingDurationAnswer"),
    [t("contactInfoQuestion")]: t("contactInfoAnswer"),
  };

  type Message = { from: "user" | "bot"; text: string };

  const exampleQuestions = Object.keys(exampleAnswers);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") throw new Error(t("fileReadError"));

        const json = JSON.parse(text);
        if (typeof json !== "object" || Array.isArray(json) || json === null) {
          alert(t("invalidJson"));
          return;
        }

        alert(t("fileLoadedSuccessfully"));
      } catch (error) {
        alert(t("fileReadError") + ": " + error);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleAsk = (q?: string) => {
    const askedQuestion = q ?? question;
    const normalized = askedQuestion.trim().toLowerCase();
    if (!normalized) return;

    setMessages((prev) => [...prev, { from: "user", text: askedQuestion }]);

    const matched = Object.entries(exampleAnswers).find(([key]) =>
      normalized.includes(key.toLowerCase())
    );
    const answer = matched ? matched[1] : t("noAnswer");

    setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    setQuestion("");
  };

  return (
    <section className="bg-[#11111b] pt-2 px-6 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-white">🤖 microAi Canlı Demo</h2>

      <div className="mb-6 w-full max-w-xl flex justify-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {t("loadQuestionsLabel")}
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".json,application/json"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>

      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md flex flex-col space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">{t("exampleQuestionsTitle")}</h3>
          <div className="flex flex-wrap gap-3">
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg shadow hover:bg-indigo-200 transition cursor-pointer select-none"
                title={t("exampleQuestionTooltip")}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2 h-72 overflow-y-auto border p-4 rounded bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-left ${
                m.from === "user"
                  ? "text-blue-600 font-semibold"
                  : "text-indigo-600"
              }`}
            >
              {m.from === "user" ? (
                <>
                  <strong>{t("labelUser")}:</strong> {m.text}
                </>
              ) : (
                <>
                  <strong>{t("labelBot")}:</strong> {m.text}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder={t("inputPlaceholder")}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAsk();
            }}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={() => handleAsk()}
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            {t("askButton")}
          </button>
        </div>
      </div>
    </section>
  );
}
