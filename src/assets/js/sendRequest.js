export const send = async(url, data) => {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!resp.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await resp
}