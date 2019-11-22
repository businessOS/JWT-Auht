import React from 'react'
import { useByeQuery } from '../generated/graphql';

interface Props {

}
export const Bye: React.FC<Props> = () => {
    const { data, loading, error } = useByeQuery({fetchPolicy: 'network-only'});
    if (loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }
    if (!data) {
        return <div>no data</div>
    }
    return (<div>Out (worked): {data.bye}</div>);
}