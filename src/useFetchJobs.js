import {useReducer, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json'

const ACTIONS = {
    MAKE_REQUEST : 'make_request',
    GET_DATA : 'get-data',
    ERROR: 'error',
    UPDATE_HNP: 'has-next-page'
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, jobs: []}
            break;
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, jobs: [], error: action.payload.error}
        case ACTIONS.UPDATE_HNP:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
            break;
    }
}

export default function(params, page) {
    const [state, dispatch] = useReducer(reducer, {
        jobs: [],
        loading: true,
    })

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            params: {
                cancelToken: cancelToken.token,
                markdown: true, 
                page: page,
                ...params
            }
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload:{jobs: res.data}})
        }).catch(e => {
            if(axios.isCancel(e)) {
                // Handle if request was cancelled
                console.log('Request canceled', e.message);
            return  
            }
            dispatch({type: ACTIONS.ERROR, payload: {error : e}})
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            params: {
                cancelToken: cancelToken2.token,
                markdown: true, 
                page: page + 1,
                ...params
            }
        }).then(res => {
            dispatch({type: ACTIONS.UPDATE_HNP, payload:{hasNextPage: res.data.length !== 0}})
        }).catch(e => {
            if(axios.isCancel(e)) {
                // Handle if request was cancelled
                console.log('Request canceled', e.message);
            return  
            }
            dispatch({type: ACTIONS.ERROR, payload: {error : e}})
        })

        return () => {
            cancelToken.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])

    return state
}