import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server'
import axios from "axios";

async function DashboardPage() {
    const user = await currentUser();

    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL

    if (user) {
        const userData = {
            clerk_user_id: user.id, // Use the Clerk user ID
            email: user.emailAddresses[0].emailAddress,

        };

        try {
            await axios.post(`${base_url}/register`, userData); // Replace with your actual API URL
            //redirect("/dashboard/form");
        } catch (error) {
            console.error("Error saving user data:", error);
            // Handle error as needed
        }
    }
    redirect("/dashboard/form");

}

export default DashboardPage;