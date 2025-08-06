"use client";

import { useState, useRef } from "react";

export default function DemoChat() {
  // Başlangıç örnek cevaplar (default)
  const defaultExampleAnswers: Record<string, string> = {
    "kargo ne zaman gelir": "Siparişiniz 1-3 iş günü içinde kargoya verilir.",
    "randevu nasıl alırım":
      "Web sitemizden veya mobil uygulamamızdan kolayca randevu alabilirsiniz.",
    "eğitim süresi ne kadar": "Eğitim süresi genellikle 8 hafta sürmektedir.",
    "iletişim bilgileri nedir": "Bize info@microai.com adresinden ulaşabilirsiniz.",
  };

  type Message = { from: "user" | "bot"; text: string };

  const [exampleAnswers, setExampleAnswers] = useState(defaultExampleAnswers);

  // Örnek sorular dizisi (sadece keyleri tutuyoruz)
  const exampleQuestions = Object.keys(exampleAnswers);

  // Mesaj listesi sadece kullanıcı ve bot mesajlarını tutacak
  const [messages, setMessages] = useState<Message[]>([]);

  const [question, setQuestion] = useState("");

  // Dosya input referansı (isteğe bağlı)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya yükleme ve parse etme
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") throw new Error("Dosya okunamadı");

        const json = JSON.parse(text);
        // json'un doğru formatta olduğundan emin olalım
        if (typeof json !== "object" || Array.isArray(json) || json === null) {
          alert("Geçersiz JSON formatı! Objekt bekleniyor.");
          return;
        }

        // Örnek cevapları güncelle
        setExampleAnswers(json);

      } catch (error) {
        alert("Dosya okunurken hata oluştu: " + error);
      }
    };
    reader.readAsText(file);

    // Input'u temizle (aynı dosya tekrar yüklenebilir)
    e.target.value = "";
  };

  const handleAsk = (q?: string) => {
    const askedQuestion = q ?? question;
    const normalized = askedQuestion.trim().toLowerCase();
    if (!normalized) return;

    // Kullanıcı mesajını ekle
    setMessages((prev) => [...prev, { from: "user", text: askedQuestion }]);

    // Cevabı bul
    const matched = Object.entries(exampleAnswers).find(([key]) =>
      normalized.includes(key)
    );
    const answer = matched
      ? matched[1]
      : "Bu soruya şu anda yanıt veremiyorum.";

    // Bot cevabını ekle
    setMessages((prev) => [...prev, { from: "bot", text: answer }]);

    setQuestion("");
  };

  return (
    <section className="bg-gray-100 py-20 px-6 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">🤖 microAi Canlı Demo</h2>

      {/* Dosya yükleme */}
      <div className="mb-6 w-full max-w-xl flex justify-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Soruları Dosyadan Yükle (JSON)
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
        {/* Örnek sorular modern kart stili */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Sorabileceğiniz Sorular</h3>
          <div className="flex flex-wrap gap-3">
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg shadow hover:bg-indigo-200 transition cursor-pointer select-none"
                title="Tıklayarak sorabilirsiniz"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Mesaj listesi */}
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
                  <strong>Sen:</strong> {m.text}
                </>
              ) : (
                <>
                  <strong>microAi:</strong> {m.text}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Soru inputu ve buton */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Bir soru yazın..."
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
            Sor
          </button>
        </div>
      </div>
    </section>
  );
}
