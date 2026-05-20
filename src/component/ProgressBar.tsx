"use client";
import { useEffect, useState } from "react";


export default function ProgressBar({ step, className }: { step: number; className?: string }) {
    const totalSteps = 3;
    const currentProgress = (step / totalSteps) * 100;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(currentProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentProgress]);

  if (currentProgress === 100) return null;
    return (
        <>
            {currentProgress !== 100 && (
                <div className={`w-full bg-gray-200 h-4 ${className}`}>
                    <div
                        className="bg-primary h-4 transition-all duration-1000 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </>
    );
}