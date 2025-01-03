"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const EditProfilePage = () => {
  const { toast } = useToast();
  const handleSubmit = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
      variant: "default",
    });
  };
  return (
    <Card className="min-h-fit rounded-3xl bg-[#fff]">
      <div className="w-full max-w-5xl mx-auto p-6">
        <Tabs defaultValue="edit-profile" className="w-full mb-8">
          <TabsList className="border-b rounded-none w-full justify-start h-auto p-0 bg-transparent space-x-6">
            <TabsTrigger
              value="edit-profile"
              className="border-b-2 border-transparent data-[state=active]:border-black px-1 pb-3 rounded-none bg-transparent h-auto data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="border-b-2 border-transparent data-[state=active]:border-black px-1 pb-3 rounded-none bg-transparent h-auto data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none text-gray-500"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="border-b-2 border-transparent data-[state=active]:border-black px-1 pb-3 rounded-none bg-transparent h-auto data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none text-gray-500"
            >
              Security
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-8">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24">
              <img
                src="/pfp_pic.jpeg"
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full p-0 border-gray-200 bg-white"
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <Label
              htmlFor="name"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Your Name
            </Label>
            <Input
              id="name"
              defaultValue="Charlene Reed"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="username"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              User Name
            </Label>
            <Input
              id="username"
              defaultValue="Charlene Reed"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="charlenereed@gmail.com"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              defaultValue="********"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label htmlFor="dob" className="text-sm text-gray-600 mb-1.5 block">
              Date of Birth
            </Label>
            <Input
              id="dob"
              defaultValue="25 January 1990"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="present-address"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Present Address
            </Label>
            <Input
              id="present-address"
              defaultValue="San Jose, California, USA"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="permanent-address"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Permanent Address
            </Label>
            <Input
              id="permanent-address"
              defaultValue="San Jose, California, USA"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="city"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              City
            </Label>
            <Input
              id="city"
              defaultValue="San Jose"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="postal-code"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Postal Code
            </Label>
            <Input
              id="postal-code"
              defaultValue="45962"
              className="border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <Label
              htmlFor="country"
              className="text-sm text-gray-600 mb-1.5 block"
            >
              Country
            </Label>
            <Input
              id="country"
              defaultValue="USA"
              className="border-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="default" onClick={() => handleSubmit()}>
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditProfilePage;