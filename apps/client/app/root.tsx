import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from '@remix-run/react'
import { useNonce } from '@shopify/hydrogen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState } from 'react'
import { PreventFlashOnWrongTheme, type Theme, ThemeProvider, useTheme } from 'remix-themes'
import { ModeToggle } from '~/components/theme/ui'
import { themeSessionResolver } from '~/sessions.server'
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { getTheme } = await themeSessionResolver(request)

    return {
        theme: getTheme(),
    }
}

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useRouteLoaderData<typeof loader>('root')

    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider specifiedTheme={data?.theme as Theme} themeAction='/action/set-theme'>
                <InnerLayout ssrTheme={Boolean(data?.theme)}>{children}</InnerLayout>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default function App() {
    return <Outlet />
}

const InnerLayout = ({
    ssrTheme,
    children,
}: {
    ssrTheme: boolean
    children: React.ReactNode
}) => {
    const [theme] = useTheme()
    const nonce = useNonce()

    return (
        <html lang='en' className={clsx(theme)}>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                <div className='flex w-full p-4 font-bold justify-between'>
                    <Link to='/'>
                        <Button className='font-bold' variant={'link'}>
                            avito.tech
                        </Button>
                    </Link>
                    <ModeToggle />
                </div>
                {children}
                <ScrollRestoration nonce={nonce} />
                <PreventFlashOnWrongTheme ssrTheme={ssrTheme} nonce={nonce} />
                <Scripts nonce={nonce} />
            </body>
        </html>
    )
}
