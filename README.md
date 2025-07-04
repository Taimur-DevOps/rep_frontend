This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



<!-- 
#Main
property_id
Title
Desc
Price
Images
Location       [important]
property_type  [important]
Bedrooms
Bathrooms
Garage
Area size      [5 Marla , 10 Marla 15 Marla ]
Year built 
Featured       [yes or No]



#Features
Air Conditioning 
Lawn
Pool
Barbeque
Gym
Cinema
Wifi
Basement
etc etc


#Contact
Name
Email 
contact
Message

 -->



























<!-- 'use client'
import Link from 'next/link';
import React, { useState } from 'react';


function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0  mr-6 lg:mr-72">
                <span> REP</span>
            </div>
            <div className="block lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                >
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
            >
                <div className="text-sm lg:flex-grow">
                    <Link to="/">
                        <span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
                            Home
                        </span>
                    </Link>
                    <Link to="/about">
                        <span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
                            About
                        </span>
                    </Link>
                    <Link to="/contact">
                        <span className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
                            Contact
                        </span>
                    </Link>

                </div>
                <div>

                </div>
            </div>
        </nav>
    );
}
export default App; -->