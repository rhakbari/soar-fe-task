import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const QuickTransfer = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("525.50");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const recipients = [
    {
      name: "Livia\nBator",
      role: "CEO",
      initials: "/quick-ava-1.jpeg",
    },
    {
      name: "Randy\nPress",
      role: "Director",
      initials: "/quick-ava-2.jpeg",
    },
    {
      name: "Workman",
      role: "Designer",
      initials: "/quick-ava-3.jpeg",
    },
  ];

  const handleSend = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Transfer Successful",
        description: `$${amount} has been sent successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error("error on quick transfer => ", error);
      toast({
        title: "Transfer Failed",
        description: "Unable to complete the transfer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) * 3 < recipients.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const visibleRecipients = recipients.slice(currentPage * 3, (currentPage + 1) * 3);
  const canGoNext = (currentPage + 1) * 3 < recipients.length;
  const canGoPrev = currentPage > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button 
            onClick={prevPage} 
            className={`${!canGoPrev ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </button>

          <div className="flex flex-row items-start justify-center gap-2 sm:gap-4 md:gap-6">
            {visibleRecipients.map((recipient, index) => (
              <div key={index} className="flex flex-col items-center">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mb-2 bg-gray-100">
                  <Image
                    src={recipient.initials}
                    width={100}
                    height={100}
                    alt={`${recipient.name}'s avatar`}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs sm:text-sm font-medium whitespace-pre-line">
                    {recipient.name}
                  </span>
                  <span className="text-xs sm:text-sm text-[#718EBF] mt-0.5">
                    {recipient.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextPage}
            className={`${!canGoNext ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={!canGoNext}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="text-xs sm:text-sm text-[#718EBF] w-full sm:w-auto text-center sm:text-left">
          Write Amount
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 w-full sm:w-36 md:w-40 lg:w-44 xl:w-48 
                     bg-gray-50 border-none rounded-full px-4 text-sm relative z-0"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-black text-white rounded-full px-3 h-10 flex items-center 
                     absolute top-1/2 right-1 sm:right-[-16px] transform -translate-y-1/2 z-10 
                     disabled:opacity-70 text-xs sm:text-sm"
          >
            {isLoading ? "Sending..." : "Send"}
            {!isLoading && <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;