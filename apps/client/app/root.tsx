import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '~/shared/ui/button'

import '~/tailwind.css'

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <div className='flex w-full p-4 font-bold'>
                    <Link to='/'>
                        <Button className='font-bold' variant={'link'}>
                            avito.tech
                        </Button>
                    </Link>
                </div>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    )
    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
    )
}
