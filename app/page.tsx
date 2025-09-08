import {redirect} from "next/navigation";

export default function Home() {
    const isLogin: boolean = true
    redirect(isLogin? '/home' : '/auth/sign-in')
}
