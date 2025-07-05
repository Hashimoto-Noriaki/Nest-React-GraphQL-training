import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

//tokenをHttpヘッダーにセットするためのリンク
const authLink = setContext((_, prevContext) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
        ...prevContext,
        authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink), //authLinkをhttpLinkの前に追加
    cache: new InMemoryCache(),
});

export default client;