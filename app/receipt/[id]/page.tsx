"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, ShieldCheck, MapPin, Mail, Phone, Globe, Printer, Loader2, ArrowLeft, Clock, XCircle, ChevronRight, Package, CreditCard, Hash, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReceiptPage() {
  const params = useParams();
  const id = params?.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <XCircle className="text-red-500 h-16 w-16" />
        <h1 className="text-2xl font-bold">Order Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const selectedPlan = pricingPlans.find(p => p.name === order.planName);
  const isPaid = order.status === "verified";

  return (
    <div className="py-20 min-h-screen bg-[#f2f2f2] dark:bg-[#121212] font-sans">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white !important; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          nav, footer, .print\\:hidden, button { display: none !important; }
          #microsoft-receipt { position: absolute; top: 0; left: 0; width: 100%; border: none !important; box-shadow: none !important; background: white !important; color: black !important; }
          .receipt-accent { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex justify-between items-center mb-12 print:hidden">
           <div>
              <h1 className="text-3xl font-semibold text-[#242424] dark:text-white">Order Confirmation</h1>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">Transaction Hash: {order._id.toUpperCase()}</p>
           </div>
           <div className="flex gap-4">
              <Link href="/services">
                <button className="text-sm font-semibold text-[#0067b8] hover:underline flex items-center gap-1">
                   <ArrowLeft size={16} /> Services
                </button>
              </Link>
              <button 
                onClick={handlePrint}
                className="bg-[#0067b8] text-white font-semibold py-2 px-6 hover:bg-[#005da6] transition-all flex items-center gap-2 text-sm shadow-lg shadow-blue-500/10"
              >
                <Printer size={16} /> Print Receipt
              </button>
           </div>
        </div>

        {/* Microsoft Style Receipt Container */}
        <div 
          id="microsoft-receipt"
          ref={receiptRef}
          className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          {/* Top Status Bar */}
          <div className={cn(
            "py-4 px-8 text-white flex items-center justify-between receipt-accent",
            isPaid ? "bg-emerald-600" : "bg-[#ffb900] text-black"
          )}>
            <div className="flex items-center gap-3">
              {isPaid ? <CheckCircle size={20} /> : <Clock size={20} />}
              <span className="text-sm font-black uppercase tracking-widest">
                {isPaid ? "Payment Verified & Asset Authorized" : "Verification in progress"}
              </span>
            </div>
            <span className="text-[10px] font-black opacity-80 uppercase tracking-[0.2em]">Official Document</span>
          </div>

          <div className="p-8 md:p-16">
            {/* Brand Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16 border-b pb-12 border-gray-100 dark:border-gray-800">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2.5 h-2.5 bg-[#f25022]"></div>
                      <div className="w-2.5 h-2.5 bg-[#7fba00]"></div>
                      <div className="w-2.5 h-2.5 bg-[#00a4ef]"></div>
                      <div className="w-2.5 h-2.5 bg-[#ffb900]"></div>
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter text-[#242424] dark:text-white uppercase">Abubakar</h2>
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    <p className="flex items-center gap-2"><MapPin size={10} className="text-blue-600" /> Lahore, PK</p>
                    <p className="flex items-center gap-2"><Globe size={10} className="text-blue-600" /> www.iamabubakar.com</p>
                  </div>
               </div>
               <div className="text-left md:text-right">
                  <h3 className="text-4xl font-black text-[#242424] dark:text-white tabular-nums tracking-tighter">#{order._id.slice(-6).toUpperCase()}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">Internal Order Token</p>
                  <p className="text-xs font-bold text-[#0067b8] mt-4 uppercase tracking-widest">Date: {new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
               <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <User size={14} className="text-blue-600" /> Bill To
                    </h4>
                    <p className="text-xl font-black text-[#242424] dark:text-white uppercase">{order.customerName}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-500 font-medium">
                       <p>{order.customerEmail}</p>
                       <p>{order.customerPhone}</p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <CreditCard size={14} className="text-blue-600" /> Payment Info
                    </h4>
                    <div className="space-y-2">
                       <p className="text-sm font-bold"><span className="text-gray-400 uppercase text-[10px] mr-2">Method:</span> {order.paymentMethod.toUpperCase()}</p>
                       <p className="text-sm font-bold"><span className="text-gray-400 uppercase text-[10px] mr-2">Status:</span> <span className={isPaid ? "text-emerald-600" : "text-amber-500"}>{isPaid ? "SUCCESSFUL" : "PENDING VERIFICATION"}</span></p>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Hash size={14} className="text-blue-600" /> Auth Details
                    </h4>
                    <div className="bg-gray-50 dark:bg-[#242424] p-6 border-l-4 border-[#0067b8]">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transaction ID / Reference</p>
                       <code className="text-sm font-black text-[#0067b8] break-all tracking-tighter">{order.transactionId}</code>
                    </div>
                  </div>
               </div>
            </div>

            {/* Order Table */}
            <div className="mb-16 overflow-hidden border border-gray-100 dark:border-gray-800">
               <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-[#242424] text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                       <th className="px-6 py-4">Subscription Plan</th>
                       <th className="px-6 py-4 text-right">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                       <td className="px-6 py-8">
                          <p className="text-lg font-black text-[#242424] dark:text-white uppercase tracking-tighter">{order.planName} Deployment</p>
                          <p className="text-xs text-gray-500 mt-2 italic leading-relaxed max-w-md">
                             {selectedPlan?.description || "High-performance project architecture and dedicated engineering resource."}
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2">
                             {selectedPlan?.features.slice(0, 4).map(f => (
                               <span key={f} className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-sm">
                                  {f}
                               </span>
                             ))}
                          </div>
                       </td>
                       <td className="px-6 py-8 text-right align-top">
                          <p className="text-2xl font-black text-[#242424] dark:text-white tabular-nums tracking-tighter">{order.planPrice}</p>
                       </td>
                    </tr>
                  </tbody>
               </table>
            </div>

            {/* Total Area */}
            <div className="flex justify-end">
               <div className="w-full md:w-72 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span className="text-[#242424] dark:text-white">{order.planPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                     <span>Estimated Tax</span>
                     <span className="text-[#242424] dark:text-white">$0.00</span>
                  </div>
                  <div className="pt-4 border-t-4 border-black dark:border-white flex justify-between items-center">
                     <span className="text-lg font-black uppercase tracking-tighter">Total Paid</span>
                     <span className="text-4xl font-black text-[#0067b8] dark:text-[#4da3ff] tabular-nums tracking-tighter">{order.planPrice}</span>
                  </div>
               </div>
            </div>

            {/* Signature Area */}
            <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-10">
               <div className="text-center md:text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Authorized Signature</p>
                  <p className="font-serif italic text-2xl text-[#242424] dark:text-white border-b-2 border-gray-200 dark:border-gray-800 pb-2 px-4">Abubakar .</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-[0.2em]">Chief Executive Officer</p>
               </div>
               <div className="text-center md:text-right max-w-xs">
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                     This receipt is generated through secure cloud infrastructure. Thank you for your partnership with Abubakar Digital Architecture.
                  </p>
               </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-6 px-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 receipt-accent">
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Powering Digital Transformation © {new Date().getFullYear()}</p>
             <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#0067b8]">
                <a href="#" className="hover:underline">Legal</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Support</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
