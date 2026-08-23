import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QrCode, Camera, Download, Share2, Check, X, ShieldCheck, RefreshCw } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  const { user, loginAsDemo } = useAuth();
  const [tab, setTab] = useState<'my_qr' | 'scan_qr'>('my_qr');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // User's unique QR target URL
  const qrUrl = user
    ? `https://healthaccess-two.vercel.app/#profile?id=${user.id}`
    : `https://healthaccess-two.vercel.app`;

  // Start Camera for scanning QR Code
  const startCamera = async () => {
    setIsScanning(true);
    setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera permission denied or unavailable:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (tab === 'scan_qr' && isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [tab, isOpen]);

  // Simulate scanning QR Code
  const handleSimulateScan = () => {
    stopCamera();
    setScanResult("Muvaffaqiyatli skanerlandi! Foydalanuvchi tasdiqlandi.");
    setTimeout(() => {
      loginAsDemo();
      if (onScanSuccess) onScanSuccess();
      onClose();
    }, 1500);
  };

  // Copy QR Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-neutral-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#dc2626] mx-auto flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            QR-Kod Tizimi
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            QR kodni skanerlab ilovaga tezkor kirish va profilni ulashish
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-2xl border border-slate-200 dark:border-neutral-800 mb-5 text-xs font-extrabold">
          <button
            onClick={() => setTab('my_qr')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              tab === 'my_qr' ? 'bg-[#dc2626] text-white shadow' : 'text-slate-500 hover:text-white'
            }`}
          >
            Mening QR Kodim
          </button>
          <button
            onClick={() => setTab('scan_qr')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              tab === 'scan_qr' ? 'bg-[#dc2626] text-white shadow' : 'text-slate-500 hover:text-white'
            }`}
          >
            QR Skanerlash (Kamera)
          </button>
        </div>

        {/* TAB 1: Show My QR Code */}
        {tab === 'my_qr' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            
            {/* Generated QR Code Card */}
            <div className="p-4 bg-white rounded-3xl border-4 border-red-600/20 shadow-xl flex flex-col items-center justify-center relative group">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}&color=dc2626`}
                alt="Health Access QR Code"
                className="w-48 h-48 rounded-xl object-contain"
              />
              <div className="mt-2 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#dc2626] block">Health Access Pass</span>
                <span className="text-xs font-bold text-slate-800">{user?.fullName || "Foydalanuvchi"}</span>
              </div>
            </div>

            {/* Link Copy & Actions */}
            <div className="flex items-center space-x-2 w-full">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-neutral-800 transition flex items-center justify-center space-x-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Nusxalandi!" : "Havolani nusxalash"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Scan QR Code with Camera */}
        {tab === 'scan_qr' && (
          <div className="flex flex-col items-center space-y-4">
            
            {/* Live Camera Viewfinder */}
            <div className="relative w-full h-60 bg-black rounded-3xl overflow-hidden border-2 border-red-600 shadow-inner flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Scanning Frame Overlay */}
              <div className="absolute inset-8 border-2 border-red-500 rounded-2xl animate-pulse flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-red-500 shadow-lg shadow-red-500 animate-bounce" />
              </div>

              <div className="absolute bottom-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center space-x-1">
                <Camera className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
                <span>Kamerani QR-kodga qarating</span>
              </div>
            </div>

            {scanResult ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-700 dark:text-emerald-300 p-3 rounded-2xl text-xs font-bold text-center w-full flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{scanResult}</span>
              </div>
            ) : (
              <button
                onClick={handleSimulateScan}
                className="w-full py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow transition flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                <span>QR-Kodni Skanerlash va Tizimga Kirish</span>
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
