"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

export default function DeveloperSettings() {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const resetMutation = trpc.database.reset.useMutation({
    onSuccess: () => {
      toast.success("Database reset successfully");
      setIsResetting(false);
    },
    onError: (error) => {
      toast.error("Failed to reset database: " + error.message);
      setIsResetting(false);
    },
  });

  const seedMutation = trpc.database.seed.useMutation({
    onSuccess: () => {
      toast.success("Database seeded successfully");
      setIsSeeding(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to seed database: " + error.message);
      setIsSeeding(false);
    },
  });

  const handleReset = async () => {
    setIsResetting(true);
    resetMutation.mutate();
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    seedMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl">Developer Settings</h1>
        <Button 
          variant="outline" 
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>

      <Card className="bg-background border-border p-6">
        <div className="space-y-4">
          <div className="border-b border-border/30 pb-4">
            <p className="text-sm opacity-70 mb-2">Database Operations</p>
            <div className="flex gap-4">
              <Button 
                variant="destructive"
                onClick={handleReset}
                disabled={isResetting || isSeeding}
              >
                {isResetting ? "Resetting..." : "Reset Database"}
              </Button>
              <Button 
                variant="outline"
                onClick={handleSeed}
                disabled={isResetting || isSeeding}
              >
                {isSeeding ? "Seeding..." : "Seed Database"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 