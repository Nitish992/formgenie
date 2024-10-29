"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import SubmitFormHeader from "./SubmitFormHeader";

interface FormField {
    label: string;
    type: "Text" | "Dropdown" | "Multiple Choice" | "Checkbox";
    options?: string[];
    validation: {
        required: boolean;
    };
}

const SubmitFormPage = ({ slug }: { slug: string }) => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (slug) {
            axios.get(`http://localhost:6004/form/${slug}`)
                .then((response) => setFields(response.data.fields))
                .catch((error) => console.error("Error fetching form data:", error));
        }
    }, [slug]);

    const handleInputChange = (label: string, value: any) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         console.log(JSON.stringify(formData));
    //         //await axios.post(`http://localhost:6004/form/${slug}/submit`, formData);
    //         alert("Form submitted successfully!");
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedData = {
            data: formData,
        };
        try {
            console.log("Looking or orinetation", formattedData);
            await axios.post(`http://localhost:6004/form/${slug}/submit`, formattedData);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <SubmitFormHeader />
            <div className="w-full flex justify-center my-24">
                <form onSubmit={handleSubmit} className="w-[700px] space-y-4">
                    {fields.map((field) => (
                        <div key={field.label} className="flex flex-col">
                            <label className="font-semibold mb-1">{field.label}</label>
                            {field.type === "Text" && (
                                <Input
                                    type="text"
                                    required={field.validation.required}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                />
                            )}
                            {field.type === "Dropdown" && field.options && (
                                <Select
                                    required={field.validation.required}
                                    onValueChange={(value: string) => handleInputChange(field.label, value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {field.type === "Multiple Choice" && field.options && (
                                <div className="space-y-1">
                                    {field.options.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData[field.label]?.[option] || false}
                                                onCheckedChange={(checked) => handleInputChange(field.label, {
                                                    ...formData[field.label],
                                                    [option]: checked,
                                                })}
                                            />
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {field.type === "Checkbox" && (
                                <Checkbox
                                    checked={formData[field.label] || false}
                                    onCheckedChange={(checked) => handleInputChange(field.label, checked)}
                                />
                            )}
                        </div>
                    ))}
                    <Button type="submit" className="center">Submit</Button>
                </form>
            </div>
        </>
    );
};

export default SubmitFormPage;
