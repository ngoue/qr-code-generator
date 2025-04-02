"use client";

import Head from "next/head";
import QRCode from "qrcode";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await QRCode.toDataURL(url, { scale: 8 });
      setDataUrl(data);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setUrl("");
    setDataUrl("");
  };

  return (
    <>
      <Head>
        <title>QR Code Generator</title>
      </Head>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
          {dataUrl ? (
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <img id="qrcode" src={dataUrl} />
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  onClick={handleDownload}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 cursor-pointer"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col justify-center items-center gap-4 w-full">
                <h1 className="italic">For Austin</h1>
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="w-full border border-gray-900 dark:border-gray-300 rounded-sm p-2 w-full max-w-[400px] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex justify-center items-center mb-4">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    disabled={!url}
                  >
                    Generate QR Code
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
}
