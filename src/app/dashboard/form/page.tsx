"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Form {
    form_id: string;
    id: number;
    name: string;
}
function FormsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [recentForms, setRecentForms] = useState<Form[]>([]);
    const { user } = useUser();

    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    //console.log(base_url);

    const [tableUserId, setTableUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTableUserId = async () => {
            if (user?.id && !tableUserId) {
                try {
                    const url = `${base_url}/user/${user.id}`;
                    const response = await axios.get(url);

                    setTableUserId(response.data.user_id);

                    console.log("Got the table user ID:", response.data.user_id, url);
                } catch (error) {
                    console.error("Failed to fetch table user ID:", error);
                }
            }
        };

        fetchTableUserId();
    }, [user, tableUserId]);

    useEffect(() => {
        const fetchRecentForms = async () => {
            if (tableUserId) {
                try {
                    const response = await axios.get(`${base_url}/user/${tableUserId}/forms`);

                    setRecentForms(response.data.forms);

                    console.log("Users recent Forms from state", recentForms);
                    console.log("Users recent Forms from response", response.data);
                } catch (error) {
                    console.error("Failed to fetch recent forms:", error);
                }
            }
        };

        fetchRecentForms();
    }, [tableUserId]);



    useEffect(() => {
        console.log("Updated recent forms:", recentForms);
    }, [recentForms]);


    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {

            // const temp = await axios.get(`http://localhost:6004/user/${user?.id}`);
            // console.log("From the file upload", user?.id);
            // const user_table_id = temp.data.user_id;

            // const recent_form_response = await axios.get(`http://localhost:6004/user/${user?.id}/forms`);
            // setRecentForms(recent_form_response.data);
            // console.log("Users recent Forms from state", recentForms);

            const response = await axios.post(`${base_url}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                params: { user_id: tableUserId },
            });
            // Redirect to the generated form

            console.log(response);
            const formId = response.data.form_id;
            window.location.href = `/dashboard/form/${formId}`;
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };
    return (
        <>
            <main className="max-w-6xl mx-auto">
                <div className="grid w-full max-w-sm items-center gap-1.5 pt-10 my-5">
                    <Label htmlFor="file">Excel or JSON File</Label>
                    <Input id="picture" type="file" onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            setFile(files[0]);
                        }
                    }} />

                </div>

                <Button onClick={handleFileUpload}>Create Form </Button>

                <Separator className="my-10" />

                <p className="text-2xl ...">Recent Forms</p>


                <div className="grid grid-cols-1 gap-4">
                    {recentForms.map((form) => (
                        <Link key={form.form_id} href={`/dashboard/form/${form.form_id}`} passHref>
                            <Card className="w-[350px] my-2 cursor-pointer hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle>{form.name}</CardTitle>
                                    <CardDescription>Form ID: {form.form_id}</CardDescription>
                                    {/* Add creation date if available */}
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>



            </main>
        </>
    );
}

export default FormsPage;
