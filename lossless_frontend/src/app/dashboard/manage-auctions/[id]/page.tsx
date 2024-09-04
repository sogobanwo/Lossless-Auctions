import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Component() {

    const [timeRemaining, setTimeRemaining] = useState(3600)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
      }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
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
                Explore the wonders of the universe in this captivating NFT artwork.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Current Bid</div>
                <div className="text-2xl font-bold">
                  <span className="text-primary">2.5</span> ETH
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Highest Bidder</div>
                <div className="flex items-center gap-2">
                  <span>@jdoe</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Time Remaining</div>
                <div className="text-2xl font-bold">
                  <span className="text-primary">{formatTime(timeRemaining)}</span>
                </div>
              </div>
              <form className="grid gap-4">
                <Button type="submit" className="w-full">
                  End Auction
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}