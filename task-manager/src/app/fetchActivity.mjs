async function getRecreationalActivity() {
    try {
        const response = await fetch("https://www.boredapi.com/api/activity?type=recreational");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.activity);
        return data.activity;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function getActivity() {
    try {
        const response = await fetch("https://www.boredapi.com/api/activity");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.activity);
        return data.activity;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

