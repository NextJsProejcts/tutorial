
import { useRouter } from 'next/navigation'

const PrivateLayout = ({ children }:any) =>{
    const router = useRouter();

    return(
        <>
            <button type="button" onClick={() => router.push('/dashboard')}>
                dashboard
            </button>
            <button type="button" onClick={() => router.push('/users')}>
                users
            </button>
            <hr />
            {children}
        </>
    )
}

export default PrivateLayout;
