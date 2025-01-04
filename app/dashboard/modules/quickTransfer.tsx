import React, { useState } from "react";
import { ChevronRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const QuickTransfer = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("525.50");
  const [isLoading, setIsLoading] = useState(false);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Transfer Successful",
        description: `$${amount} has been sent successfully`,
        variant: "default",
      });
      
      // Optionally reset the amount or perform other actions
      // setAmount("");
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "Unable to complete the transfer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-center w-full mb-8">
        <div className="justify-center flex items-start space-x-8">
          {recipients.map((recipient, index) => (
            <div key={index} className="justify-center flex flex-col">
              <Avatar className="justify-between h-12 w-12 ml-2.5 mb-3 bg-gray-100">
                <Image src={recipient.initials} width={100} height={100} alt={"avatar"}/>
              </Avatar>
              <div className="justify-between flex flex-col items-center text-center">
                <span className="justify-between text-sm font-medium">{recipient.name}</span>
                <span className="justify-between text-sm text-[#718EBF] mt-0.5">
                  {recipient.role}
                </span>
              </div>
            </div>
          ))}

          <button className="mt-4">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="justify-center relative flex items-center gap-4">
        <div className="text-sm text-[#718EBF]">Write Amount</div>
        <div className="relative">
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 w-30 bg-[#F5F7FD] border-none rounded-full px-4 text-sm relative z-0"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading}
            className="bg-black text-white rounded-full px-5 h-10 flex items-center absolute top-1/2 right-[-20px] transform -translate-y-1/2 z-10 disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Send"}
            {!isLoading && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuickTransfer;