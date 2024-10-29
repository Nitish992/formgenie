"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import ResponseChart from "./Responses";

interface FormField {
    label: string;
    type: "Text" | "Dropdown" | "Multiple Choice" | "Checkbox";
    options?: string[];
    validation: {
        required: boolean;
    };
}
interface FormResponse {
    [key: string]: string | boolean | { [option: string]: boolean } | undefined;
}

interface FormPageProps {
    slug: string;
}

const FormPage = ({ slug }: FormPageProps) => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<FormResponse>({});
    const [responses, setResponses] = useState<FormResponse[]>([]);
    const [shareLink, setShareLink] = useState<string>("");

    useEffect(() => {
        if (slug) {
            axios.get(`http://localhost:6004/form/${slug}`)
                .then((response) => setFields(response.data.fields))
                .catch((error) => console.error("Error fetching form data:", error));
            setShareLink(`http://localhost:3000/form/${slug}`);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) {
            axios.get(`http://localhost:6004/form/${slug}/responses`)
                .then((response) => setResponses(response.data.responses))
                .catch((error) => console.error("Error fetching responses:", error));
        }
    }, [slug]);

    const handleInputChange = (label: string, value: string | boolean | { [option: string]: boolean }) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:6004/form/${slug}/submit`, formData);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="flex flex-col items-center m-10">
            <Tabs defaultValue="form" className="w-3/5 m-10">
                <TabsList className="flex justify-center">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                </TabsList>
                <TabsContent value="form">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="my-4">Share Form</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Share this link</DialogTitle>
                            <DialogDescription>
                                <span>Copy this link to share the form:</span>
                                <div className="flex items-center">
                                    <Input value={shareLink} readOnly />
                                    <Button onClick={copyToClipboard}>Copy</Button>
                                </div>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.label} className="flex flex-col">
                                <label className="font-semibold mb-1">{field.label}</label>
                                {field.type === "Text" && (
                                    <Input
                                        className="w-3/5"
                                        type="text"
                                        required={field.validation.required}
                                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    />
                                )}
                                {field.type === "Dropdown" && field.options && (
                                    <Select
                                        onValueChange={(value: string) => handleInputChange(field.label, value)}
                                    >
                                        <SelectTrigger className="w-3/5">
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
                                {/* {field.type === "Multiple Choice" && field.options && (
                                    <div className="space-y-1">
                                        {field.options.map((option) => (
                                            <div key={option} className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={!!formData[field.label]?.[option]} // Coerce undefined to false
                                                    onCheckedChange={(checked) =>
                                                        setFormData((prevFormData) => ({
                                                            ...prevFormData,
                                                            [field.label]: {
                                                                ...prevFormData[field.label],
                                                                [option]: checked,
                                                            } as FormResponse[string], // Type assertion for nested object
                                                        }))
                                                    }
                                                />
                                                <span>{option}</span>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                                {field.type === "Multiple Choice" && field.options && (
                                    <div className="space-y-1">
                                        {field.options.map((option) => (
                                            <div key={option} className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={!!(formData[field.label] && typeof formData[field.label] === 'object')}
                                                    onCheckedChange={(checked) => {
                                                        setFormData((prevFormData) => {
                                                            // Safely retrieve the current value and ensure it's of the correct type
                                                            const currentValue: Record<string, boolean> =
                                                                (typeof prevFormData[field.label] === 'object' && prevFormData[field.label] !== null)
                                                                    ? prevFormData[field.label]
                                                                    : {};

                                                            return {
                                                                ...prevFormData,
                                                                [field.label]: {
                                                                    ...currentValue,
                                                                    [option]: checked,
                                                                } as Record<string, boolean>, // Ensure the type is correct
                                                            } as FormResponse; // Final return type assertion
                                                        });
                                                    }}
                                                />
                                                <span>{option}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {field.type === "Checkbox" && (
                                    <Checkbox
                                        checked={!!formData[field.label]}
                                        onCheckedChange={(checked) => handleInputChange(field.label, checked)}
                                    />
                                )}
                            </div>
                        ))}
                        <Button type="submit">Submit</Button>
                    </form>
                </TabsContent>
                <TabsContent value="responses">
                    <Label htmlFor="terms" className="text-lg font-semibold">Total Responses: {responses.length}</Label>
                    <ResponseChart responses={responses} fields={fields} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default FormPage;

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Label } from "./ui/label";
// import ResponseChart from "./Responses";

// interface FormField {
//     label: string;
//     type: "Text" | "Dropdown" | "Multiple Choice" | "Checkbox";
//     options?: string[];
//     validation: {
//         required: boolean;
//     };
// }

// interface FormResponse {
//     [key: string]: string | boolean | string[] | undefined; // Define possible response types
// }

// interface FormPageProps {
//     slug: string;
// }

// const FormPage = ({ slug }: { slug: string }) => {
//     const [fields, setFields] = useState<FormField[]>([]);
//     const [formData, setFormData] = useState<FormResponse>({});
//     const [responses, setResponses] = useState<FormResponse[]>([]);
//     const [shareLink, setShareLink] = useState<string>("");

//     useEffect(() => {
//         if (slug) {
//             axios.get(`http://localhost:6004/form/${slug}`)
//                 .then((response) => setFields(response.data.fields))
//                 .catch((error) => console.error("Error fetching form data:", error));
//             setShareLink(`http://localhost:3000/form/${slug}`); // Update the link accordingly
//         }
//     }, [slug]);

//     useEffect(() => {
//         if (slug) {
//             console.log("Responses API called");
//             const url = `http://localhost:6004/form/${slug}/responses`;
//             console.log(url);
//             axios.get(url)
//                 .then((response) => {
//                     setResponses(response.data.responses);
//                     console.log("Fetched responses:", response.data); // Log the fetched data here
//                 })
//                 .catch((error) => console.error("Error fetching responses:", error));
//         }
//     }, [slug]);

//     console.log("fromn the state", responses);

//     const handleInputChange = (label: string, value: any) => {
//         setFormData((prev) => ({ ...prev, [label]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:6004/form/${slug}/submit`, formData);
//             alert("Form submitted successfully!");
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(shareLink);
//         alert("Link copied to clipboard!");
//     };

//     return (
//         <div className="flex flex-col items-center m-10">
//             <Tabs defaultValue="form" className="w-3/5 m-10">
//                 <TabsList className="flex justify-center">
//                     <TabsTrigger value="form">Form</TabsTrigger>
//                     <TabsTrigger value="responses">Responses</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="form">

//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button className="my-4">Share Form</Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogTitle>Share this link</DialogTitle>
//                             <DialogDescription>
//                                 <span>Copy this link to share the form:</span>
//                                 <div className="flex items-center">
//                                     <Input value={shareLink} readOnly />
//                                     <Button onClick={copyToClipboard}>Copy</Button>
//                                 </div>
//                             </DialogDescription>
//                         </DialogContent>
//                     </Dialog>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {fields.map((field) => (
//                             <div key={field.label} className="flex flex-col">
//                                 <label className="font-semibold mb-1">{field.label}</label>
//                                 {field.type === "Text" && (
//                                     <Input className="w-3/5"
//                                         type="text"
//                                         required={field.validation.required}
//                                         onChange={(e) => handleInputChange(field.label, e.target.value)}
//                                     />
//                                 )}
//                                 {field.type === "Dropdown" && field.options && (
//                                     <Select

//                                         required={field.validation.required}
//                                         onValueChange={(value: string) => handleInputChange(field.label, value)}
//                                     >
//                                         <SelectTrigger className="w-3/5">
//                                             <SelectValue placeholder="Select an option" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {field.options.map((option) => (
//                                                 <SelectItem key={option} value={option}>
//                                                     {option}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 )}
//                                 {/* {field.type === "Multiple Choice" && field.options && (
//                                     <div className="space-y-1">
//                                         {field.options.map((option) => (
//                                             <div key={option} className="flex items-center space-x-2">
//                                                 <Checkbox
//                                                     checked={formData[field.label]?.[option] || false}
//                                                     onCheckedChange={(checked) => handleInputChange(field.label, {
//                                                         ...formData[field.label],
//                                                         [option]: checked,
//                                                     })}
//                                                 />
//                                                 <span>{option}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )} */}
//                                 {field.type === "Multiple Choice" && field.options && (
//                                     <div className="space-y-1">
//                                         {field.options.map((option) => (
//                                             <div key={option} className="flex items-center space-x-2">
//                                                 <Checkbox
//                                                     checked={!!formData[field.label]?.[option]} // Coerce undefined to false
//                                                     onCheckedChange={(checked) =>
//                                                         setFormData((prevFormData) => ({
//                                                             ...prevFormData,
//                                                             [field.label]: {
//                                                                 ...prevFormData[field.label],
//                                                                 [option]: checked,
//                                                             },
//                                                         }))
//                                                     }
//                                                 />
//                                                 <span>{option}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                                 {field.type === "Checkbox" && (
//                                     <Checkbox
//                                         checked={formData[field.label] || false}
//                                         onCheckedChange={(checked) => handleInputChange(field.label, checked)}
//                                     />
//                                 )}
//                             </div>
//                         ))}

//                     </form>
//                 </TabsContent>
//                 <TabsContent value="responses">
//                     <Label htmlFor="terms" className="text-lg font-semibold">Total Responses: {responses.length}</Label>
//                     <ResponseChart responses={responses} fields={fields} />

//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// };

// export default FormPage;
