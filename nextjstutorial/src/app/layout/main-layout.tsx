'use client';

import { useEffect, useState } from "react";
import StoreContainer from "../base/store/store-container";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";


const MainLayout = ({children}:any) =>{
    const [myToke, setMyToke] = useState('');

    useEffect(() => {
        let token = localStorage?.getItem('token');
        setMyToke(token as any)
    }, [])

    
    return(
        myToke && <>
            {myToke ? 
                <PrivateLayout >
                    <StoreContainer>
                        {children}
                    </StoreContainer>
                </PrivateLayout> : 
                <PublicLayout>
                    {children}
                </PublicLayout>
            }
        </>
    )
}

export default MainLayout;