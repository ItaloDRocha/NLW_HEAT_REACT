import { useEffect } from 'react';
import {VscGithubInverted} from 'react-icons/vsc'
import { api } from '../../services/api';

import styles from './styles.module.scss'

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;

    }
}

export function LoginBox(){
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=4627ef8641e08e1f6630`;

    async function signIn(githubCode: string){
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })

        const {token,user} = response.data;

        localStorage.setItem('@dowile:token', token);

        console.log(user)
    }


    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=')

        if(hasGithubCode){
            const [urlWithoutCode, githubCode] = url.split('?code=')
            console.log({urlWithoutCode,githubCode})

            window.history.pushState({},'',urlWithoutCode)

            signIn(githubCode)
        }

    }, [])
    
    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGitHub}>
                <VscGithubInverted size="24" />
                Entrar com Github
            </a>
        </div>
    )
}