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
    <div className="py-20 min-h-screen bg-slate-50 dark:bg-[#0c0c0c] font-sans">
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          body { 
            background: white !important; 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
            font-size: 10pt !important;
          }
          nav, footer, .print\\:hidden, button, .no-print { 
            display: none !important; 
          }
          #enterprise-receipt { 
            position: absolute !important; 
            top: 0 !important; 
            left: 0 !important; 
            width: 210mm !important; 
            height: 297mm !important;
            border: none !important; 
            box-shadow: none !important; 
            background: white !important; 
            color: black !important; 
            padding: 10mm !important;
            margin: 0 !important;
            min-height: 297mm !important;
            display: flex !important;
            flex-direction: column !important;
          }
          #enterprise-receipt .p-12, #enterprise-receipt .md\\:p-16 {
            padding: 5mm !important;
          }
          #enterprise-receipt .mb-20, #enterprise-receipt .mb-12 { margin-bottom: 5mm !important; }
          #enterprise-receipt .mb-24 { margin-bottom: 8mm !important; }
          #enterprise-receipt .py-10 { padding-top: 5mm !important; padding-bottom: 5mm !important; }
          #enterprise-receipt .text-5xl, #enterprise-receipt .text-6xl { font-size: 2.5rem !important; }
          #enterprise-receipt .text-3xl { font-size: 1.25rem !important; }
          #enterprise-receipt .text-2xl { font-size: 1.1rem !important; }
          #enterprise-receipt .text-xl { font-size: 1rem !important; }
          .dark { background: white !important; color: black !important; }
          .receipt-accent { background-color: #0067b8 !important; color: white !important; }
          .text-blue-600, .text-[#0067b8] { color: #0067b8 !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center mb-8 print:hidden">
           <Link href="/services">
              <button className="text-sm font-bold text-slate-500 hover:text-[#0067b8] flex items-center gap-2 transition-colors uppercase tracking-widest">
                 <ArrowLeft size={16} /> Exit to Services
              </button>
           </Link>
           <button 
             onClick={handlePrint}
             className="bg-[#0067b8] text-white font-bold py-3 px-8 hover:bg-[#005da6] transition-all flex items-center gap-2 text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
           >
             <Printer size={16} /> Generate Document
           </button>
        </div>

        {/* Enterprise Receipt Container */}
        <div 
          id="enterprise-receipt"
          ref={receiptRef}
          className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden min-h-[1050px] flex flex-col"
        >
          {/* Header Accent Line */}
          <div className="h-2 bg-[#0067b8] w-full"></div>

          <div className="p-12 md:p-16 flex-grow flex flex-col">
            {/* Top Section: Branding & Document Info */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0067b8] flex items-center justify-center text-white rounded-sm shadow-lg">
                       <ShieldCheck size={28} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Abubakar Siddique</h2>
                       <p className="text-[10px] font-bold text-[#0067b8] uppercase tracking-[0.3em]">FULL STACK DEVELOPER</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    <p className="flex items-center gap-3"><MapPin size={12} className="text-[#0067b8]" /> Lahore, Pakistan | Digital Operations</p>
                    <p className="flex items-center gap-3"><Mail size={12} className="text-[#0067b8]" /> abubakr.bgnu@gmail.com</p>
                    <p className="flex items-center gap-3"><Globe size={12} className="text-[#0067b8]" /> www.iamabubakar.site</p>
                  </div>
               </div>

               <div className="text-left md:text-right space-y-2">
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900/10 dark:text-white/5 uppercase tracking-tighter absolute top-12 right-12 select-none pointer-events-none">RECEIPT</h1>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter pt-4">#{order._id.slice(-8).toUpperCase()}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                     <div className={cn("w-2 h-2 rounded-full", isPaid ? "bg-emerald-500" : "bg-amber-500")}></div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                        Status: {isPaid ? "Payment Verified" : "Awaiting Authorization"}
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4">Issued: {new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
               </div>
            </div>

            {/* Entity Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
               <div className="space-y-8">
                  <div className="relative">
                    <h4 className="text-[11px] font-black text-[#0067b8] uppercase tracking-[0.2em] mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Client Information</h4>
                    <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.customerName}</p>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                       <p className="flex items-center gap-2 italic"><Mail size={12} /> {order.customerEmail}</p>
                       <p className="flex items-center gap-2 italic"><Phone size={12} /> {order.customerPhone}</p>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-black text-[#0067b8] uppercase tracking-[0.2em] mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Payment Verification</h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-l-4 border-[#0067b8] rounded-r-sm">
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gateway</p>
                             <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{order.paymentMethod}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorization</p>
                             <p className="text-sm font-black text-emerald-600 uppercase">{isPaid ? "Verified" : "Pending"}</p>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Transaction Hash (TID)</p>
                             <code className="text-[10px] font-black text-[#0067b8] break-all tracking-normal font-mono">{order.transactionId}</code>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-10">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-slate-900 dark:border-white text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                         <th className="py-4 px-4">Technical Module & Description</th>
                         <th className="py-4 px-4 text-right">Service Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                         <td className="py-8 px-4">
                            <div className="flex items-start gap-4">
                               <div className="mt-1 w-2 h-2 bg-[#0067b8] rotate-45 shrink-0"></div>
                               <div>
                                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">{order.planName} Deployment</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-xl font-medium italic">
                                     {selectedPlan?.description || "High-performance project architecture and dedicated engineering resource provided as per official service protocols."}
                                  </p>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                     {selectedPlan?.features.slice(0, 6).map(f => (
                                       <span key={f} className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-sm">
                                          {f}
                                       </span>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="py-8 px-4 text-right align-top">
                            <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{order.planPrice}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">One-time Investment</p>
                         </td>
                      </tr>
                    </tbody>
                 </table>
               </div>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-end mb-10">
               <div className="w-full md:w-80 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <span>Net Service Amount</span>
                     <span className="text-slate-900 dark:text-white">{order.planPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <span>Authorization Fee</span>
                     <span className="text-slate-900 dark:text-white">$0.00</span>
                  </div>
                  <div className="pt-4 border-t-2 border-slate-900 dark:border-white flex justify-between items-end">
                     <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] block mb-1">Grand Total</span>
                        <span className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">Amount Settled</span>
                     </div>
                     <span className="text-4xl font-black text-[#0067b8] tabular-nums tracking-tighter">{order.planPrice}</span>
                  </div>
               </div>
            </div>

            {/* Certification Area */}
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 border-2 border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                     <ShieldCheck size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Authorized Digital Signature</p>
                     <p className="font-serif italic text-2xl text-slate-900 dark:text-white opacity-80">Abubakar Siddique</p>
                     <p className="text-[9px] font-bold text-[#0067b8] uppercase tracking-[0.2em] mt-1">Full Stack Developer</p>
                  </div>
               </div>
               <div className="text-center md:text-right max-w-xs space-y-1">
                  <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Official Certification</p>
                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">
                     This document serves as formal evidence of transaction and project initiation. All digital assets are protected under global technical protocols.
                  </p>
               </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-900 text-white py-6 px-12 flex flex-col md:flex-row justify-between items-center gap-4 receipt-accent">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm">
                   <Package size={14} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em]">Engineering Digital Excellence © {new Date().getFullYear()}</p>
             </div>
             <div className="flex items-center gap-6 text-[8px] font-black uppercase tracking-[0.3em] text-white/60">
                <a href="#" className="hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-white transition-colors">Protocol</a>
                <a href="#" className="hover:text-white transition-colors">Governance</a>
             </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] print:hidden">
           End of Official Document Node
        </p>
      </div>
    </div>
  );
}