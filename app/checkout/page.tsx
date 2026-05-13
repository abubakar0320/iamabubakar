"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Building, Smartphone, CheckCircle, ChevronRight, ChevronLeft, Download, Printer, ShieldCheck, MapPin, Mail, Phone, Globe, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

// The actual checkout flow
function CheckoutProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "Custom Plan";
  const planPrice = searchParams.get("price") || "Contact for pricing";
  
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    transactionId: ""
  });
  
  const handleNext = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (step === 3) {
      setSaving(true);
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            planName: planName,
            planPrice: planPrice,
            paymentMethod: formData.paymentMethod,
            transactionId: formData.transactionId
          })
        });
        if (res.ok) {
          const order = await res.json();
          router.push(`/receipt/${order._id}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      {/* Microsoft Style Progress Bar */}
      <div className="mb-16 print:hidden">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
          
          {["Identity", "Payment", "Confirm"].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step >= stepNum;
            const isCurrent = step === stepNum;
            return (
              <div key={label} className="flex flex-col items-center bg-white dark:bg-[#121212] px-4">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all border-2",
                    isActive 
                      ? "bg-[#0067b8] border-[#0067b8] text-white" 
                      : "bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-gray-600 text-gray-400"
                  )}
                >
                  {isActive && step > stepNum ? <CheckCircle size={20} /> : stepNum}
                </div>
                <span className={cn(
                  "mt-3 text-[11px] font-bold uppercase tracking-[0.1em]",
                  isActive ? "text-[#0067b8] dark:text-[#4da3ff]" : "text-gray-400"
                )}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 pb-12 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                <p className="text-gray-500 text-sm">Subscribe to <span className="font-bold text-[#0067b8] dark:text-[#4da3ff]">{planName}</span></p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Due Today</p>
                <p className="text-4xl font-black tracking-tight">{planPrice}</p>
              </div>
            </div>

            <form onSubmit={handleNext} className="space-y-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-[#0067b8]"></div> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Phone Number (WhatsApp Preferred)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
                  />
                </div>
              </div>
              
              <div className="pt-8 flex justify-end">
                <button type="submit" className="bg-[#0067b8] text-white font-semibold py-3 px-10 hover:bg-[#005da6] transition-all flex items-center gap-2">
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-2">Select Payment Method</h2>
            <p className="text-gray-500 text-sm mb-12 border-b pb-8 dark:border-gray-800">Secure transaction authorized for {planName}.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { id: "bank", name: "Bank Transfer", icon: Building },
                { id: "jazzcash", name: "JazzCash App", icon: Smartphone },
                { id: "easypaisa", name: "EasyPaisa App", icon: Smartphone },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setFormData({...formData, paymentMethod: method.id})}
                  className={cn(
                    "p-8 border-2 text-center transition-all flex flex-col items-center gap-4",
                    formData.paymentMethod === method.id
                      ? "border-[#0067b8] bg-[#0067b8]/5"
                      : "border-gray-100 dark:border-gray-800 hover:border-gray-300"
                  )}
                >
                  <method.icon 
                    size={40} 
                    strokeWidth={1.5}
                    className={formData.paymentMethod === method.id ? "text-[#0067b8]" : "text-gray-400"} 
                  />
                  <h3 className={cn(
                    "font-bold text-sm uppercase tracking-widest",
                    formData.paymentMethod === method.id ? "text-[#0067b8]" : "text-gray-500"
                  )}>{method.name}</h3>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-800">
              <button onClick={handleBack} className="text-[#0067b8] font-bold text-sm hover:underline flex items-center gap-2">
                <ChevronLeft size={18} /> Previous
              </button>
              <button 
                onClick={() => handleNext()} 
                disabled={!formData.paymentMethod}
                className="bg-[#0067b8] text-white font-semibold py-3 px-10 hover:bg-[#005da6] transition-all flex items-center gap-2 disabled:bg-gray-300"
              >
                Proceed <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-2">Final Confirmation</h2>
            <p className="text-gray-500 text-sm mb-12">Submit your payment reference to establish connection.</p>

            <div className="bg-[#f2f2f2] dark:bg-[#242424] p-8 mb-12 border-l-4 border-[#0067b8]">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                 <Info size={14} className="text-[#0067b8]" /> Recipient Meta
              </h4>
              {formData.paymentMethod === "bank" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Bank Designation</span>
                    <span className="font-bold text-sm">Meezan Bank Limited</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Holder</span>
                    <span className="font-bold text-sm">Abubakar Siddique</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">IBAN / Account Node</span>
                    <span className="font-mono font-black text-blue-600 text-lg">PK87MEZN0098690114217768</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Number</span>
                    <span className="font-mono font-black text-blue-600 text-lg">98690114217768</span>
                  </div>
                </div>
              )}
              {(formData.paymentMethod === "jazzcash" || formData.paymentMethod === "easypaisa") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mobile Gateway</span>
                    <span className="font-bold text-sm uppercase">{formData.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Registered Name</span>
                    <span className="font-bold text-sm">Abubakar Siddique</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Terminal Number</span>
                    <span className="font-mono font-black text-blue-600 text-lg">
                      {formData.paymentMethod === "jazzcash" ? "0325 4060120" : "0316 7169757"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleNext} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Transaction ID (TID) / Auth Hash</label>
                <input
                  type="text"
                  required
                  value={formData.transactionId}
                  onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                  placeholder="Paste your 12-digit reference number"
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all font-mono text-base font-bold"
                />
                <p className="text-[11px] text-gray-400 font-medium italic mt-2 flex items-center gap-1.5">
                   <ShieldCheck size={12} className="text-emerald-500" /> Transaction details are logged via encrypted protocols.
                </p>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={handleBack} className="text-[#0067b8] font-bold text-sm hover:underline flex items-center gap-2">
                   <ChevronLeft size={18} /> Previous
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-[#0067b8] text-white font-semibold py-4 px-12 hover:bg-[#005da6] transition-all flex items-center gap-3 disabled:bg-gray-300 shadow-lg shadow-blue-500/20 uppercase text-xs tracking-widest"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                  {saving ? "Authorizing..." : "Complete Order"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="py-24 min-h-screen bg-[#fcfcfc] dark:bg-[#121212]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white">Review your <span className="text-[#0067b8] dark:text-[#4da3ff]">Investment</span></h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">Finish your project deployment setup.</p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
          </div>
        }>
          <CheckoutProcess />
        </Suspense>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
