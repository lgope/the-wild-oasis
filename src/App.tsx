/* MODULE IMPORTS */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/layout";

/* PAGE IMPORTS */
import {
    Account,
    Booking,
    Bookings,
    Cabins,
    Checkin,
    Dashboard,
    Login,
    PageNotFound,
    Settings,
    Users,
} from "@/pages";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProtectedRoute } from "./features/authentication";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route
                            path="bookings/:bookingId"
                            element={<Booking />}
                        />
                        <Route
                            path="checkin/:bookingId"
                            element={<Checkin />}
                        />
                        <Route path="/cabins" element={<Cabins />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/users" element={<Users />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;

/*
    <div>
            <Heading as="h1">H1 Hello World</Heading>
            <Heading as="h2">H2 Hello World</Heading>
            <Heading as="h3">H3 Hello World</Heading>
            <Heading as="h4">H4 Hello World</Heading>
            </div>
            <div>
                <Center>
                    <Button>Check In</Button>
                </Center>
            </div>
            <div>
                <Center>
                    <Input placeholder="Hello" />
                </Center>
            </div>
            <div>
                <Row justify="even">
                    <Button size="large">Check In</Button>
                    <Button variant="secondary">Check In</Button>
                </Row>
            </div>
            <div>
                <Center>
                    <Column align="center">
                        <Button size="small">Check In</Button>
                        <Button>Check In</Button>
                        <Button size="large">Check In</Button>
                    </Column>
                </Center>
            </div>
            <div>
                <Center>
                    <Column align="center">
                        <Button>Check In</Button>
                        <Button variant="secondary">Check In</Button>
                        <Button variant="danger">Check In</Button>
                    </Column>
                </Center>
    </div>
*/
