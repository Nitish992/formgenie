
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, useUser } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'
import axios from "axios";
async function DashboardPage() {
    const user = await currentUser();

    if (user) {
        const userData = {
            clerk_user_id: user.id, // Use the Clerk user ID
            email: user.emailAddresses[0].emailAddress,

        };

        try {
            await axios.post('http://localhost:6004/register', userData); // Replace with your actual API URL
            //redirect("/dashboard/form");
        } catch (error) {
            console.error("Error saving user data:", error);
            // Handle error as needed
        }
    }
    redirect("/dashboard/form");

}

export default DashboardPage;