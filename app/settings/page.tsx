"use client";
import React, { useState, useCallback, useMemo, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  dob: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormFieldProps {
  id: keyof FormData;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = memo(({ id, label, type = "text", value, error, onChange }: FormFieldProps) => (
  <div>
    <Label htmlFor={id} className="text-sm text-gray-600 mb-1.5 block">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`border-gray-200 rounded-lg ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
));

FormField.displayName = 'FormField';

const ProfileAvatar = memo(() => (
  <div className="relative inline-block">
    <Avatar className="h-24 w-24">
      <Image
        src="/pfp_pic.jpeg"
        alt="Profile"
        className="w-full h-full object-cover object-top"
        width={500}
        height={500}
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
));

ProfileAvatar.displayName = 'ProfileAvatar';

const validationRules = {
  name: (value: string) => !value.trim() ? "Name is required" : value.length < 2 ? "Name must be at least 2 characters" : "",
  username: (value: string) => !value.trim() ? "Username is required" : value.length < 3 ? "Username must be at least 3 characters" : "",
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !value.trim() ? "Email is required" : !emailRegex.test(value) ? "Please enter a valid email" : "";
  },
  password: (value: string) => value !== "********" && value.length < 8 ? "Password must be at least 8 characters" : "",
  postalCode: (value: string) => {
    const postalCodeRegex = /^\d{5}(-\d{4})?$/;
    return !value.trim() ? "Postal code is required" : !postalCodeRegex.test(value) ? "Please enter a valid postal code" : "";
  }
};

const EditProfilePage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "********",
    dob: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA"
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useMemo(() => () => {
    const newErrors: FormErrors = {};

    Object.entries(validationRules).forEach(([field, rule]) => {
      const error = rule(formData[field as keyof FormData]);
      if (error) newErrors[field] = error;
    });

    // Additional required field validations
    ['dob', 'presentAddress', 'city', 'country'].forEach(field => {
      if (!formData[field as keyof FormData].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => ({
      ...prev,
      [id]: ""
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Profile Updated",
          description: "Your changes have been saved successfully.",
          variant: "default",
        });
      } catch (error) {
        console.error('error on saving settings => ',error)

        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  }, [validateForm, toast]);

  const formFields = useMemo(() => [
    { id: 'name', label: 'Your Name' },
    { id: 'username', label: 'User Name' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
    { id: 'dob', label: 'Date of Birth' },
    { id: 'presentAddress', label: 'Present Address' },
    { id: 'permanentAddress', label: 'Permanent Address' },
    { id: 'city', label: 'City' },
    { id: 'postalCode', label: 'Postal Code' },
    { id: 'country', label: 'Country' }
  ], []);

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
          <ProfileAvatar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
          {formFields.map(({ id, label, type }) => (
            <FormField
              key={id}
              id={id as keyof FormData}
              label={label}
              type={type}
              value={formData[id as keyof FormData]}
              error={errors[id]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            variant="default" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditProfilePage;