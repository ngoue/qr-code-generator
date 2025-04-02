"use client";

import qrcode from "qrcode";
import clsx from "clsx";
import { useRef, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    qrcode.toCanvas(canvasRef.current, url, {}, (error) => {
      if (error) {
        console.error("Error generating QR code:", error);
      } else {
        setShow(true);
      }
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const image = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setShow(false);
    canvasRef.current
      ?.getContext("2d")
      ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <div className={clsx("w-full", show ? "hidden" : "block")}>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <h1 className="italic">For Austin</h1>
              <input
                type="url"
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
        </div>
        <div className={clsx(show ? "block" : "hidden")}>
          <div className={`flex flex-col justify-center items-center gap-4`}>
            <canvas ref={canvasRef} id="qrcode" />
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
        </div>
      </main>
    </div>
  );
}
