import React from "react"
import {createRoot} from "react-dom/client"
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import App from "./components/App"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './styles/index.scss'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('root'))
root.render(
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
)