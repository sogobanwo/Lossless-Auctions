"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Component() {
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-transparent">
      <div className="container max-w-5xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-[#C9E4CA] p-4 rounded">
            <img
              src="/placeholder.svg"
              alt="NFT Artwork"
              width="400"
              height="400"
              className="w-full max-w-[400px] rounded-lg"
              style={{ aspectRatio: "400/400", objectFit: "cover" }}
            />
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold">Cosmic Odyssey</h2>
              <p className="text-muted-foreground">
                Explore the wonders of the universe in this captivating NFT
                artwork.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center  bg-[#030E19]/70 p-4">
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[#C9E4CA]">Current Bid</div>
                <div className="text-2xl font-bold text-white">
                  <span className="">2.5</span> ETH
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#C9E4CA]">Highest Bidder</div>
                <div className="flex items-center gap-2 text-white">
                  <span>@jdoe</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#C9E4CA]">Time Remaining</div>
                <div className="text-2xl font-bold">
                  <span className="text-white">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              <form className="grid gap-4">
                <Input
                  type="number"
                  placeholder="Enter your bid amount"
                  className="px-4 py-2 rounded-lg border border-input"
                />
                <Button
                  type="submit"
                  className="w-full bg-[#C9E4CA] text-[#030E19]/70"
                >
                  Place Bid
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
