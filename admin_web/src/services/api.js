import Cookies from 'js-cookie';
import qs from 'qs';
const BASE_API = 'http://localhost:3000/api';

const apiFetchPost = async (endpoint, body) => {

    if (!body.token) {
        let token = Cookies.get('token');

        if (token) {
            body.token = token
        }
    }

    const res = await fetch(BASE_API+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body:JSON.stringify(body)
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/logon';
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint, body = []) => {

    if (!body.token) {
        let token = Cookies.get('token');

        if (token) {
            body.token = token
        }
    }

    const res = await fetch(`${BASE_API+endpoint}?${qs.stringify(body)}`);

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/logon';
        return;
    }

    return json;
}

const Useapi = {

    login:async (email, password) => {
        const json = await apiFetchPost(
            '/admin/login',
            {email:email, password:password}

        );
        return json;   
    },
}


export default ()=>Useapi;