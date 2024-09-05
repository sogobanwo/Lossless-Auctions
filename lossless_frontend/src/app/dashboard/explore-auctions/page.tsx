"use client";

import EmptyPage from "@/components/shared/NoNft";
import { useGetAllAuction } from "@/hooks/useGetAllAuctions";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [auctions, setAuctions] = useState<any>([]);
  const [endedAuctions, setEndedAuctions] = useState<any>([]);
  const [streamingNow, setStreamingNow] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("explore");

  const allAuctions = useGetAllAuction();

  useEffect(() => {
    setAuctions(allAuctions.data);
    const auctions = allAuctions.data.filter((auction: any) => !auction.ended);
    setAuctions(auctions);
  }, [allAuctions.data]);

  useEffect(() => {
    setAuctions(allAuctions.data);
    const endedAuctions = allAuctions.data.filter(
      (auction: any) => auction.ended
    );
    setEndedAuctions(endedAuctions);
  }, [allAuctions.data]);

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#C9E4CA]">Auctions</h1>
        <div className="flex space-x-4">
          <button
            className={`${
              activeTab === "explore"
                ? "bg-[#C9E4CA] text-black"
                : "text-gray-500"
            } rounded-lg px-4 py-2`}
            onClick={() => setActiveTab("explore")}
          >
            Explore
          </button>
          <button
            className={`${
              activeTab === "ended"
                ? "bg-[#C9E4CA] text-black"
                : "text-gray-500"
            } rounded-lg px-4 py-2`}
            onClick={() => setActiveTab("ended")}
          >
            Ended Auctions
          </button>
          <button
            className={`${
              activeTab === "streaming"
                ? "bg-[#C9E4CA] text-black"
                : "text-gray-500"
            } rounded-lg px-4 py-2`}
            onClick={() => setActiveTab("streaming")}
          >
            Streaming Now
          </button>
        </div>
      </div>
      {activeTab === "explore" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {auctions.length > 0 ? (
            auctions.map((auction: any, index: number) => {
              return (
                <div
                  key={auction.auctionId}
                  className="rounded-lg border border-gray-200 bg-[#C9E4CA] shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <img
                    alt="Auction Item"
                    className="h-60 w-full rounded-t-lg object-cover"
                    height={300}
                    src={auction.imageURI}
                    style={{
                      aspectRatio: "400/300",
                      objectFit: "cover",
                    }}
                    width={400}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{auction.name}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {" "}
                      Min Bid: {"  "}
                      {ethers.formatEther(auction.minValidBid)} Avax
                    </p>
                    <Link
                      href={`/dashboard/explore-auctions/${auction.auctionId}`}
                      className="mt-4 text-sm hover:underline"
                    >
                      View Auction
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyPage wording={"There is no available auction"} />
          )}
        </div>
      )}
      {activeTab === "ended" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {endedAuctions.length > 0 ? (
            endedAuctions.map((auction: any, index: number) => {
              return (
                <div
                  key={auction.auctionId}
                  className="rounded-lg border border-gray-200 bg-[#C9E4CA] shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <img
                    alt="Auction Item"
                    className="h-60 w-full rounded-t-lg object-cover"
                    height={300}
                    src={auction.imageURI}
                    style={{
                      aspectRatio: "400/300",
                      objectFit: "cover",
                    }}
                    width={400}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{auction.name}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {" "}
                      Min Bid: {"  "}
                      {ethers.formatEther(auction.minValidBid)} Avax
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyPage wording={"There are no ended auctions"} />
          )}
        </div>
      )}
      {activeTab === "streaming" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {streamingNow.length > 0 ? (
            streamingNow.map((auction: any, index: number) => {
              return <div></div>;
            })
          ) : (
            <EmptyPage wording={"There are no streaming auctions"} />
          )}
        </div>
      )}
    </main>
  );
};

export default Page;
