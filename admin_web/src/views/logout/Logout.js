import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {doLogout} from '../../helper/AuthHandler';

export default () =>{

    useEffect(()=>{
        doLogout(); 
    },[])

    return null;
}