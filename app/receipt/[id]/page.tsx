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
        <Loader2 className="animate-spin h-12 w-12 text-[#00d4ff]" />
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
    <div className="py-20 min-h-screen bg-slate-50 dark:bg-[#0c0c0c] font-sans">
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 5mm 10mm; 
          }
          body { 
            background: white !important; 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
            font-size: 9.5pt !important;
            line-height: 1.25 !important;
          }
          nav, footer, .print\\:hidden, button, .no-print { 
            display: none !important; 
          }
          #enterprise-receipt { 
            position: static !important;
            width: 100% !important;
            border: none !important; 
            box-shadow: none !important; 
            background: white !important; 
            color: black !important; 
            padding: 0 !important;
            margin: 0 !important;
          }
          #enterprise-receipt .p-12, #enterprise-receipt .md\\:p-16 {
            padding: 0 !important;
          }
          .receipt-section {
            margin-bottom: 6mm !important;
          }
          .dark { background: white !important; color: black !important; }
          .receipt-accent { background-color: #0067b8 !important; color: white !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center mb-8 print:hidden">
           <Link href="/services">
              <button className="text-sm font-bold text-slate-500 hover:text-[#00d4ff] flex items-center gap-2 transition-colors uppercase tracking-widest">
                 <ArrowLeft size={16} /> Exit to Services
              </button>
           </Link>
           <button 
             onClick={handlePrint}
             className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white font-bold py-3 px-8 hover:bg-gradient-to-r from-[#c00082] via-[#4a2474] to-[#00b8cc] transition-all flex items-center gap-2 text-xs uppercase tracking-[0.2em] shadow-xl shadow-fuchsia-500/20"
           >
             <Printer size={16} /> Generate Document
           </button>
        </div>

        {/* Enterprise Receipt Container */}
        <div 
          id="enterprise-receipt"
          ref={receiptRef}
          className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col"
        >
          {/* Header Accent Line */}
          <div className="h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] w-full"></div>

          <div className="p-8 md:p-12 flex-grow flex flex-col">
            {/* Top Branding Bar */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6 receipt-section">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] flex items-center justify-center text-white rounded-sm shadow-md">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Abubakar Siddique</h2>
                     <p className="text-[9px] font-bold text-[#00d4ff] uppercase tracking-[0.3em]">Full Stack Developer</p>
                  </div>
               </div>
               <div className="text-right flex flex-col items-end">
                  <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">OFFICIAL RECEIPT</h1>
                  <div className={cn(
                    "mt-2 px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] rounded-sm flex items-center gap-1.5",
                    isPaid ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  )}>
                     {isPaid ? <CheckCircle size={10} /> : <Clock size={10} />}
                     {isPaid ? "Successful" : "Verification Pending"}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Hash ID: {order._id.slice(-12).toUpperCase()}</p>
               </div>
            </div>

            {/* Entity Information Table */}
            <div className="grid grid-cols-2 gap-0 border border-slate-200 dark:border-slate-800 mb-8 receipt-section">
               <div className="p-6 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                  <h4 className="text-[10px] font-black text-[#00d4ff] uppercase tracking-[0.2em] mb-4">Client Assignment</h4>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase leading-tight">{order.customerName}</p>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium italic">
                     <p>{order.customerEmail}</p>
                     <p>{order.customerPhone}</p>
                  </div>
               </div>
               <div className="p-6">
                  <h4 className="text-[10px] font-black text-[#00d4ff] uppercase tracking-[0.2em] mb-4">Transaction Meta</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-[11px]">
                     <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Method</span>
                        <span className="font-bold uppercase text-slate-800 dark:text-slate-200">{order.paymentMethod}</span>
                     </div>
                     <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date Issued</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{new Date(order.createdAt).toLocaleDateString()}</span>
                     </div>
                     <div className="col-span-2">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Verified Hash (TID)</span>
                        <code className="font-mono text-[#00d4ff] font-bold">{order.transactionId}</code>
                     </div>
                  </div>
               </div>
            </div>

            {/* Line Items */}
            <div className="mb-8 receipt-section">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.2em]">
                       <th className="py-3 px-4">Technical Service Module</th>
                       <th className="py-3 px-4 text-right">Investment Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 border-x border-b border-slate-200 dark:border-slate-800">
                    <tr>
                       <td className="p-6">
                          <p className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.planName} Deployment</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-xl italic">
                             {selectedPlan?.description || "Technical project architecture and engineering resource."}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                             {selectedPlan?.features.slice(0, 5).map(f => (
                               <span key={f} className="text-[7.5px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-sm">
                                  {f}
                               </span>
                             ))}
                          </div>
                       </td>
                       <td className="p-6 text-right align-top">
                          <p className="text-xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{order.planPrice}</p>
                       </td>
                    </tr>
                  </tbody>
               </table>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-between items-start mb-12 receipt-section">
               <div className="max-w-xs">
                  <h4 className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 underline decoration-[#0067b8] decoration-2 underline-offset-4">Provider Details</h4>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest space-y-1">
                     <p>abubakr.bgnu@gmail.com</p>
                     <p>www.iamabubakar.site</p>
                     <p>Lahore, Pakistan</p>
                  </div>
               </div>
               <div className="w-64 space-y-2 border-t-2 border-slate-900 dark:border-white pt-4">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <span>Service Subtotal</span>
                     <span className="text-slate-900 dark:text-white">{order.planPrice}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff]">Total Settled</span>
                     <span className="text-3xl font-black text-[#00d4ff] tabular-nums tracking-tighter leading-none">{order.planPrice}</span>
                  </div>
               </div>
            </div>

            {/* Verification Footer */}
            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-[#00d4ff] bg-slate-50 dark:bg-slate-900/50">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Digital Signature Authenticated</p>
                     <p className="font-serif italic text-2xl text-slate-900 dark:text-white leading-none">Abubakar Siddique</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-1">Engineering Digital Excellence</p>
                  <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest italic">Official Certification Document © {new Date().getFullYear()}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}