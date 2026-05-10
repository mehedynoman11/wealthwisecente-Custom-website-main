'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [image, setImage] = useState("");

    useEffect(() => {
        if (session?.user?.image) {
            setImage(session.user.image);
        }
    }, [session]);

    // Protect Route
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p className="p-6">Loading...</p>;
    }

    if (!session) return null;

    const name = session?.user?.name;
    const initial = name?.charAt(0)?.toUpperCase() || "U";

    // Upload Image
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.url) {
                setImage(data.url);

                // Save image URL to DB
                console.log("Uploaded URL:", data.url);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="md:p-6 p-2">
            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <p className="mb-4 text-green-600">
                Logged in as: {session.user?.email}
            </p>

            <div className="flex flex-wrap md:flex-nowrap gap-10">

                {/* Left Side */}
                <div className="md:w-1/3 w-full shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg p-6 bg-white flex flex-col items-center gap-4">

                    <Avatar className="w-28 h-28 md:w-32 md:h-32">
                        <AvatarImage
                            src={image || undefined}
                            alt="profile"
                            className="w-full h-full object-cover rounded-full"
                        />

                        <AvatarFallback className="flex items-center justify-center text-xl font-bold">
                            {initial}
                        </AvatarFallback>
                    </Avatar>

                    {/* Upload Button */}
                    <label className="cursor-pointer bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
                        Update Photo

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                {/* Right Side */}
                <div className="md:w-2/3">
                    <p className="text-2xl font-semibold">
                        Hello, {session.user?.name}
                    </p>

                    <div className="mt-8 flex gap-4 flex-wrap">

                        <button
                            className="border border-[#dcb66b] text-[#dcb66b] py-2 px-4 rounded-md"
                        >
                            Change Password
                        </button>

                        <button
                            className="bg-black text-white py-2 px-4 rounded-md"
                        >
                            Edit Profile
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;