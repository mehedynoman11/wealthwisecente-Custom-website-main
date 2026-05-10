'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    const companies = [
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
    ];

    return (
        <div className="md:px-5 md:py-5 p-2">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quote with your.</h1>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder="Name"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <IoSearch className='text-2xl absolute top-2 right-3' />
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {companies
                    .filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((company, index) => (
                        <Link href={`/user/${index}`} key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-2 border-[#dcb66b] flex items-center">
                            <img
                                src="/Images/Home/brands1.png"
                                alt="Shell Logo"
                                className="w-8 h-8"
                            />
                            <div className="m-auto">
                                <p className="font-semibold -mr-32">{company.name}</p>
                                <a
                                    href={`https://${company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" hover:underline text-sm"
                                >
                                    {company.website}
                                </a>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Page;
