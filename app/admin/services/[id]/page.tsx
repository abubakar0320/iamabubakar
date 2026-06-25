"use client";

import React, { useEffect, useState } from "react";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { Loader2 } from "lucide-react";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (!service) {
    return <div className="text-center py-20">Service not found.</div>;
  }

  return <ServiceForm initialData={service} isEdit />;
}
