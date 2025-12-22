export async function api(url, options = {}) {
    const res = await fetch(url, options);
    const text = await res.text();

    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        console.error("Invalid JSON from server:", text);
        throw new Error("Server error");
    }

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}
